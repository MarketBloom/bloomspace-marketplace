import { supabase } from "@/integrations/supabase/client";

async function getGoogleMapsApiKey() {
  try {
    const { data, error } = await supabase.functions.invoke('get-maps-key');
    if (error) {
      console.error('Error fetching Google Maps API key:', error);
      throw error;
    }
    return data.key;
  } catch (error) {
    console.error('Error fetching Google Maps API key:', error);
    throw new Error('Failed to get Google Maps API key');
  }
}

export async function calculateDrivingDistance(
  origin: [number, number],
  destination: [number, number]
): Promise<number> {
  try {
    const apiKey = await getGoogleMapsApiKey();
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch distance from Google Maps API');
    }

    const data = await response.json();
    
    if (data.status !== 'OK' || !data.rows[0]?.elements[0]?.distance?.value) {
      throw new Error('Invalid response from Google Maps API');
    }

    // Convert meters to kilometers
    return data.rows[0].elements[0].distance.value / 1000;
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