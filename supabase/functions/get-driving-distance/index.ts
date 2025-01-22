import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DistanceRequest {
  origin: [number, number];
  destination: [number, number];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    if (!apiKey) {
      throw new Error('Missing Google Maps API key')
    }

    const { origin, destination }: DistanceRequest = await req.json()
    
    if (!origin || !destination) {
      throw new Error('Missing origin or destination coordinates')
    }

    console.log('Fetching distance with params:', { origin, destination });

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?` +
      `origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}` +
      `&mode=driving&units=metric&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    console.log('Google Maps API response:', data);

    if (data.status !== 'OK' || !data.rows?.[0]?.elements?.[0]?.distance?.value) {
      console.error('Invalid Google Maps API response:', data);
      throw new Error(`Google Maps API error: ${data.status} - ${data.error_message || 'Unknown error'}`)
    }

    // Convert meters to kilometers
    const distanceKm = data.rows[0].elements[0].distance.value / 1000

    return new Response(
      JSON.stringify({ distance: distanceKm }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})