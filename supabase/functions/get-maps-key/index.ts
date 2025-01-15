import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
  
  return new Response(
    JSON.stringify({ apiKey }),
    { 
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    },
  )
})