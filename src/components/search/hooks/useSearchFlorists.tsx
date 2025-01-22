import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { filterFloristsByDrivingDistance } from "@/utils/distance";

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

        // Filter florists based on coordinates availability
        const floristsWithCoords = florists.filter(florist => {
          if (!florist.coordinates) return false;
          try {
            // Handle both string and array formats
            const coordinates = typeof florist.coordinates === 'string' 
              ? JSON.parse(florist.coordinates) 
              : florist.coordinates;
            return coordinates && coordinates.length === 2;
          } catch (e) {
            console.error('Error parsing coordinates for florist:', florist.store_name, e);
            return false;
          }
        });

        // Prepare data for distance calculation
        const floristsForDistance = floristsWithCoords.map(florist => ({
          coordinates: typeof florist.coordinates === 'string' 
            ? JSON.parse(florist.coordinates) 
            : florist.coordinates,
          delivery_distance_km: florist.delivery_distance_km || 5
        }));

        // Calculate which florists are within driving distance
        const withinDistance = await filterFloristsByDrivingDistance(
          userCoordinates,
          floristsForDistance
        );

        // Return only florists within driving distance
        return floristsWithCoords.filter((_, index) => withinDistance[index]);
      }

      const { data: florists, error } = await query;
      if (error) throw error;
      
      return florists;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};