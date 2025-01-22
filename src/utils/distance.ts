import { supabase } from "@/integrations/supabase/client";

export async function calculateDrivingDistance(
  origin: [number, number],
  destination: [number, number]
): Promise<number> {
  try {
    const { data, error } = await supabase.functions.invoke('get-driving-distance', {
      body: { origin, destination }
    });

    if (error) {
      console.error('Error calculating distance:', error);
      throw error;
    }

    return data.distance;
  } catch (error) {
    console.error('Error calculating driving distance:', error);
    throw error;
  }
}

export async function filterFloristsByDrivingDistance(
  userLocation: [number, number],
  florists: Array<{ coordinates: [number, number], delivery_distance_km: number }>
): Promise<boolean[]> {
  try {
    const results = await Promise.all(
      florists.map(async (florist) => {
        try {
          const distance = await calculateDrivingDistance(userLocation, florist.coordinates);
          return distance <= florist.delivery_distance_km;
        } catch (error) {
          console.error('Error calculating distance for florist:', error);
          return false;
        }
      })
    );
    return results;
  } catch (error) {
    console.error('Error calculating driving distances:', error);
    throw error;
  }
}