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

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      // Filter florists based on location and delivery radius if location is specified
      if (location && userCoordinates && data) {
        return data.filter(florist => {
          if (!florist.coordinates) return false;
          
          const floristCoords = JSON.parse(String(florist.coordinates));
          const distance = window.calculate_distance(
            userCoordinates[0],
            userCoordinates[1],
            floristCoords[0],
            floristCoords[1]
          );
          
          return distance <= (florist.delivery_radius || 0);
        });
      }

      return data || [];
    },
  });
};