import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EARTH_RADIUS_KM = 6371;

// Fallback calculation using Haversine formula
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS_KM * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

// Cache for distance calculations
const distanceCache = new Map<string, number>();

export async function filterFloristsByDrivingDistance(
  userCoords: [number, number],
  florists: Array<{ coordinates: { lat: number; lng: number }; delivery_distance_km: number }>
): Promise<boolean[]> {
  const [userLat, userLng] = userCoords;
  
  try {
    console.log('Starting distance calculations for coordinates:', userLat, userLng);
    
    return await Promise.all(
      florists.map(async (florist) => {
        if (!florist.coordinates) {
          console.log('Missing coordinates for florist');
          return false;
        }

        // Create cache key
        const cacheKey = `${userLat},${userLng}-${florist.coordinates.lat},${florist.coordinates.lng}`;
        
        // Check cache first
        if (distanceCache.has(cacheKey)) {
          const cachedDistance = distanceCache.get(cacheKey)!;
          return cachedDistance <= (florist.delivery_distance_km || 5);
        }

        try {
          // Try to get driving distance from edge function
          const { data: { distance }, error } = await supabase.functions.invoke('get-driving-distance', {
            body: {
              origin: { lat: userLat, lng: userLng },
              destination: florist.coordinates
            }
          });

          if (error) throw error;

          // Cache the result
          distanceCache.set(cacheKey, distance);
          
          console.log('Calculated driving distance:', distance);
          return distance <= (florist.delivery_distance_km || 5);

        } catch (error) {
          console.warn('Falling back to Haversine calculation due to error:', error);
          
          // Fallback to Haversine calculation
          const haversineDistance = calculateHaversineDistance(
            userLat,
            userLng,
            florist.coordinates.lat,
            florist.coordinates.lng
          );
          
          // Cache the fallback result
          distanceCache.set(cacheKey, haversineDistance);
          
          // Add 20% buffer to the Haversine distance since it's straight-line
          return haversineDistance * 1.2 <= (florist.delivery_distance_km || 5);
        }
      })
    );
  } catch (error) {
    console.error('Error in distance calculations:', error);
    throw error;
  }
}