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
    queryKey: ['products', fulfillmentType, searchParams.toString()],
    queryFn: async () => {
      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;
      const location = searchParams.get('location');
      const dateStr = searchParams.get('date');

      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
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

      if (error) throw error;

      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');
      const searchDate = dateStr ? parseISO(dateStr) : null;
      const dayOfWeek = searchDate ? format(searchDate, 'EEEE').toLowerCase() : null;

      const productsWithVariants = productsData.flatMap(product => {
        // Skip products from florists outside delivery radius if location is specified
        if (location && userCoordinates && product.florist_profiles?.coordinates) {
          const floristCoords = JSON.parse(String(product.florist_profiles.coordinates));
          const distance = window.calculate_distance(
            userCoordinates[0],
            userCoordinates[1],
            floristCoords[0],
            floristCoords[1]
          );
          
          if (distance > (product.florist_profiles.delivery_radius || 0)) {
            return [];
          }
        }

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

      if (maxBudget) {
        return productsWithVariants.filter(product => product.displayPrice <= maxBudget);
      }

      return productsWithVariants;
    },
  });
};