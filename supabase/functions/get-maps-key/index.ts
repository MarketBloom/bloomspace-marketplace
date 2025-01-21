import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    
    if (!apiKey) {
      console.error('GOOGLE_MAPS_API_KEY not found in environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured',
          details: 'The Google Maps API key is not set in the environment variables'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Successfully retrieved Google Maps API key')
    
    return new Response(
      JSON.stringify({ apiKey }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error in get-maps-key function:', error.message)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'An error occurred while retrieving the Google Maps API key'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})