import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface UpdateProfileToFloristParams {
  profile_id: string;
  store_name: string;
  phone_number: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { profile_id, store_name, phone_number } = await req.json() as UpdateProfileToFloristParams

    // First update the profile role to florist
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .update({ role: 'florist' })
      .eq('id', profile_id)

    if (profileError) throw profileError

    // Then create the florist profile
    const { error: floristError } = await supabaseClient
      .from('florist_profiles')
      .insert({
        id: profile_id,
        store_name,
        address: '123 Example St, Sydney NSW 2000',
        about_text: 'A lovely local florist.',
        phone: phone_number
      })

    if (floristError) throw floristError

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})