import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("Loading get-driving-distance function...")

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { origin, destination } = await req.json()
    
    console.log("Request received:", { origin, destination })

    if (!origin || !destination) {
      console.error("Missing required parameters:", { origin, destination })
      return new Response(
        JSON.stringify({ error: "Missing origin or destination coordinates" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      )
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    if (!apiKey) {
      console.error("Google Maps API key not configured")
      return new Response(
        JSON.stringify({ error: "Google Maps API key not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      )
    }

    console.log("Making request to Google Maps API...")
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=${apiKey}`
    
    console.log("Request URL (without API key):", url.replace(apiKey, 'API_KEY'))
    const response = await fetch(url)
    const data = await response.json()

    console.log("Google Maps API response:", data)

    if (data.status === 'REQUEST_DENIED') {
      console.error("Google Maps API request denied:", data.error_message)
      return new Response(
        JSON.stringify({ 
          error: "Google Maps API request denied", 
          details: data.error_message 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      )
    }

    if (!data.rows?.[0]?.elements?.[0]?.distance?.value) {
      console.error("Invalid response from Google Maps API:", data)
      return new Response(
        JSON.stringify({ 
          error: "Invalid response from Google Maps API", 
          details: data 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      )
    }

    const distance = data.rows[0].elements[0].distance.value / 1000 // Convert to km
    console.log("Calculated distance:", distance, "km")
    
    return new Response(
      JSON.stringify({ distance }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    console.error("Error in get-driving-distance:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})