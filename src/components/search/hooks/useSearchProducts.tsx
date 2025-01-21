import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, parseISO } from "date-fns";

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
            store_name,
            address,
            delivery_cutoff,
            delivery_start_time,
            delivery_end_time,
            operating_hours,
            coordinates,
            delivery_radius,
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

      // Filter by location if coordinates are provided
      if (location && userCoordinates) {
        // Get all florists first
        const { data: florists, error: floristError } = await supabase
          .from('florist_profiles')
          .select('id, coordinates, delivery_radius');

        if (floristError) throw floristError;

        // Filter florists by delivery radius
        const floristsInRange = florists.filter(florist => {
          if (!florist.coordinates) return false;
          
          let coordinates;
          try {
            // Handle both string and array formats
            coordinates = typeof florist.coordinates === 'string' 
              ? JSON.parse(florist.coordinates) 
              : florist.coordinates;

            const distance = window.calculate_distance(
              userCoordinates[0],
              userCoordinates[1],
              coordinates[0],
              coordinates[1]
            );
            
            return distance <= (florist.delivery_radius || 5);
          } catch (e) {
            console.error('Error parsing coordinates for florist:', florist.id, e);
            return false;
          }
        });

        // Get products only from florists in range
        const floristIds = floristsInRange.map(f => f.id);
        if (floristIds.length > 0) {
          query = query.in('florist_id', floristIds);
        } else {
          // If no florists in range, return empty array
          return [];
        }
      }

      // Apply budget filter if specified
      if (maxBudget) {
        query = query.lte('price', maxBudget);
      }

      const { data: productsData, error } = await query;

      if (error) throw error;

      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');
      const searchDate = dateStr ? parseISO(dateStr) : null;
      const dayOfWeek = searchDate ? format(searchDate, 'EEEE').toLowerCase() : null;

      // Create product variants and apply other filters
      const productsWithVariants = productsData.flatMap(product => {
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