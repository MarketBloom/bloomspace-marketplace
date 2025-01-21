import { supabase } from "@/integrations/supabase/client";

interface DistanceMatrixResponse {
  rows: {
    elements: {
      status: string;
      distance: {
        value: number;  // meters
      };
      duration: {
        value: number;  // seconds
      };
    }[];
  }[];
}

export async function calculateDrivingDistance(
  origin: [number, number],
  destinations: Array<[number, number]>
): Promise<number[]> {
  try {
    // Get API key from Supabase
    const { data: secretData, error: secretError } = await supabase
      .rpc('get_secret', { secret_name: 'GOOGLE_MAPS_API_KEY' });

    if (secretError || !secretData?.[0]?.secret) {
      console.error('Error fetching Google Maps API key:', secretError);
      throw new Error('Failed to get Google Maps API key');
    }

    const apiKey = secretData[0].secret;
    
    // Format coordinates for the API
    const originStr = `${origin[0]},${origin[1]}`;
    const destinationsStr = destinations
      .map(([lat, lng]) => `${lat},${lng}`)
      .join('|');

    // Call Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?` +
      `origins=${originStr}&destinations=${destinationsStr}` +
      `&mode=driving&units=metric&key=${apiKey}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error('Distance Matrix API request failed');
    }

    const data: DistanceMatrixResponse = await response.json();
    
    // Extract distances in kilometers
    return data.rows[0].elements.map(element => 
      element.status === 'OK' ? element.distance.value / 1000 : Infinity
    );
  } catch (error) {
    console.error('Error calculating driving distances:', error);
    return destinations.map(() => Infinity);
  }
}

// Batch process florists for distance calculation
export async function filterFloristsByDrivingDistance(
  userLocation: [number, number],
  florists: Array<{ coordinates: [number, number], delivery_distance_km: number }>,
  batchSize = 25
): Promise<boolean[]> {
  const results: boolean[] = [];
  
  // Process florists in batches
  for (let i = 0; i < florists.length; i += batchSize) {
    const batch = florists.slice(i, i + batchSize);
    const destinations = batch.map(f => f.coordinates);
    
    const distances = await calculateDrivingDistance(userLocation, destinations);
    
    // Compare each distance with florist's delivery radius
    const batchResults = distances.map((distance, index) => 
      distance <= batch[index].delivery_distance_km
    );
    
    results.push(...batchResults);
  }
  
  return results;
}