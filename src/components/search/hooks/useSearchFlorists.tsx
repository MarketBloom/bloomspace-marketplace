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
      let query = supabase
        .from('florist_profiles')
        .select('*')
        .eq('store_status', 'published');

      const location = searchParams.get('location');

      if (location && userCoordinates) {
        const { data: florists, error } = await query;
        if (error) throw error;

        return florists.filter(florist => {
          if (!florist.coordinates) return false;

          try {
            let coordinates;
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

            console.log('Distance calculation for florist:', {
              florist: florist.store_name,
              distance,
              deliveryRadius: florist.delivery_radius,
              coordinates,
              userCoordinates
            });

            return distance <= (florist.delivery_radius || 5);
          } catch (e) {
            console.error('Error calculating distance for florist:', florist.store_name, e);
            return false;
          }
        });
      }

      const { data: florists, error } = await query;
      if (error) throw error;
      
      return florists;
    }
  });
};