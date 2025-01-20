import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UseSearchFloristsProps {
  searchParams: URLSearchParams;
  userCoordinates: [number, number] | null;
}

export const useSearchFlorists = ({ searchParams, userCoordinates }: UseSearchFloristsProps) => {
  return useQuery({
    queryKey: ['florists', searchParams.toString()],
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
        
        const filteredData = await Promise.all(allFlorists.map(async (florist) => {
          if (!florist.coordinates) {
            console.log(`${florist.store_name} has no coordinates`);
            return null;
          }

          const { data: isWithinRadius, error } = await supabase.rpc(
            'is_within_delivery_radius',
            {
              user_lat: userCoordinates[0],
              user_lng: userCoordinates[1],
              florist_coordinates: florist.coordinates,
              delivery_radius: florist.delivery_radius || 0
            }
          );

          if (error) {
            console.error('Error checking delivery radius:', error);
            return null;
          }

          console.log(`${florist.store_name} delivery check:`, {
            coordinates: florist.coordinates,
            delivery_radius: florist.delivery_radius,
            isWithinRadius
          });

          return isWithinRadius ? florist : null;
        }));

        return filteredData.filter(Boolean);
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