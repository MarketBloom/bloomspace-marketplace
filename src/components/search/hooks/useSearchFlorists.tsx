import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UseSearchFloristsProps {
  searchParams: URLSearchParams;
  userCoordinates: [number, number] | null;
}

export const useSearchFlorists = ({ searchParams, userCoordinates }: UseSearchFloristsProps) => {
  return useQuery({
    queryKey: ['florists', searchParams.toString(), userCoordinates],
    queryFn: async () => {
      const location = searchParams.get('location');
      console.log('User coordinates:', userCoordinates);
      
      let query = supabase
        .from('florist_profiles')
        .select(`
          id,
          store_name,
          address,
          about_text,
          operating_hours,
          delivery_fee,
          delivery_radius,
          minimum_order_amount,
          logo_url,
          banner_url,
          social_links,
          store_status,
          coordinates
        `)
        .eq('store_status', 'published');

      const { data: allFlorists, error } = await query;

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      // Filter florists based on location and delivery radius if coordinates are available
      if (location && userCoordinates && allFlorists) {
        console.log('Filtering florists by delivery radius...');
        
        const filteredFlorists = allFlorists.filter(florist => {
          if (!florist.coordinates) {
            console.log(`${florist.store_name} has no coordinates`);
            return false;
          }

          try {
            const floristCoords = JSON.parse(String(florist.coordinates));
            // Use the global calculate_distance function defined in utils/distance.ts
            const distance = window.calculate_distance(
              userCoordinates[0],
              userCoordinates[1],
              floristCoords[0],
              floristCoords[1]
            );

            console.log(`${florist.store_name} delivery check:`, {
              coordinates: florist.coordinates,
              delivery_radius: florist.delivery_radius,
              distance
            });

            return distance <= (florist.delivery_radius || 5);
          } catch (error) {
            console.error(`Error parsing coordinates for ${florist.store_name}:`, error);
            return false;
          }
        });

        return filteredFlorists;
      }

      return allFlorists || [];
    },
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
      }
    }
  });
};