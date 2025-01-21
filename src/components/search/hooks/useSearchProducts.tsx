import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, parseISO } from "date-fns";
import { filterFloristsByDrivingDistance } from "@/utils/distance";

interface UseSearchProductsProps {
  fulfillmentType: "pickup" | "delivery";
  searchParams: URLSearchParams;
  userCoordinates: [number, number] | null;
}

export const useSearchProducts = ({ fulfillmentType, searchParams, userCoordinates }: UseSearchProductsProps) => {
  return useQuery({
    queryKey: ['products', fulfillmentType, searchParams.toString(), userCoordinates],
    queryFn: async () => {
      console.log('Fetching products with params:', {
        fulfillmentType,
        searchParams: Object.fromEntries(searchParams.entries()),
        userCoordinates
      });

      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;
      const location = searchParams.get('location');
      const dateStr = searchParams.get('date');

      let query = supabase
        .from('products')
        .select(`
          *,
          florist_profiles!inner (
            id,
            store_name,
            address,
            delivery_cutoff,
            delivery_start_time,
            delivery_end_time,
            operating_hours,
            coordinates,
            delivery_distance_km,
            delivery_days
          ),
          product_sizes (
            id,
            name,
            price_adjustment,
            images
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (maxBudget) {
        query = query.lte('price', maxBudget);
      }

      const { data: productsData, error } = await query;
      if (error) throw error;

      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');
      const searchDate = dateStr ? parseISO(dateStr) : null;
      const dayOfWeek = searchDate ? format(searchDate, 'EEEE').toLowerCase() : null;

      // Filter products based on location and driving distance
      let filteredProducts = productsData;
      
      if (location && userCoordinates) {
        // Prepare florists data for distance calculation
        const floristsMap = new Map();
        const floristsForDistance = productsData
          .map(product => {
            const florist = product.florist_profiles;
            if (!florist.coordinates) return null;
            
            try {
              const coordinates = typeof florist.coordinates === 'string' 
                ? JSON.parse(florist.coordinates) 
                : florist.coordinates;
              
              if (!floristsMap.has(florist.id)) {
                floristsMap.set(florist.id, {
                  coordinates,
                  delivery_distance_km: florist.delivery_distance_km || 5
                });
              }
              return floristsMap.get(florist.id);
            } catch (e) {
              console.error('Error parsing coordinates for florist:', florist.store_name, e);
              return null;
            }
          })
          .filter(Boolean);

        // Calculate which florists are within driving distance
        const withinDistance = await filterFloristsByDrivingDistance(
          userCoordinates,
          Array.from(floristsMap.values())
        );

        // Create a set of florist IDs within distance
        const floristIdsWithinDistance = new Set(
          Array.from(floristsMap.keys()).filter((_, index) => withinDistance[index])
        );

        // Filter products based on florist distance
        filteredProducts = productsData.filter(product => 
          floristIdsWithinDistance.has(product.florist_profiles.id)
        );
      }

      // Create product variants and apply other filters
      const productsWithVariants = filteredProducts.flatMap(product => {
        // Check if florist delivers on the selected day
        if (dayOfWeek && fulfillmentType === "delivery" && 
            product.florist_profiles?.delivery_days && 
            !product.florist_profiles.delivery_days.includes(dayOfWeek)) {
          return [];
        }

        // For same-day delivery, check cutoff time
        const isSameDay = searchDate && isToday(searchDate);
        const cutoffTime = product.florist_profiles?.delivery_cutoff;
        
        if (isSameDay && cutoffTime && currentTime > cutoffTime) {
          return [];
        }

        if (!product.product_sizes || product.product_sizes.length === 0) {
          return [{
            ...product,
            displaySize: null,
            displayPrice: product.price,
            sizeId: null,
            floristName: product.florist_profiles?.store_name,
            isDeliveryAvailable: fulfillmentType === "delivery" && 
              (!isSameDay || (cutoffTime && currentTime < cutoffTime)),
            isPickupAvailable: fulfillmentType === "pickup" && 
              product.florist_profiles?.operating_hours && 
              currentTime < product.florist_profiles?.delivery_end_time,
            deliveryCutoff: product.florist_profiles?.delivery_cutoff,
            pickupCutoff: product.florist_profiles?.delivery_end_time
          }];
        }

        return product.product_sizes.map(size => ({
          ...product,
          displaySize: size.name,
          displayPrice: product.price + (size.price_adjustment || 0),
          sizeId: size.id,
          floristName: product.florist_profiles?.store_name,
          isDeliveryAvailable: fulfillmentType === "delivery" && 
            (!isSameDay || (cutoffTime && currentTime < cutoffTime)),
          isPickupAvailable: fulfillmentType === "pickup" && 
            product.florist_profiles?.operating_hours && 
            currentTime < product.florist_profiles?.delivery_end_time,
          deliveryCutoff: product.florist_profiles?.delivery_cutoff,
          pickupCutoff: product.florist_profiles?.delivery_end_time,
          images: size.images?.length ? size.images : product.images
        }));
      });

      return productsWithVariants;
    },
  });
};