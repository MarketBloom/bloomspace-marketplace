import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface FloristData {
  email: string;
  password: string;
  storeName: string;
  phone: string;
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

    const { florists } = await req.json() as { florists: FloristData[] }
    const createdFlorists = []

    for (const florist of florists) {
      // Create the user account
      const { data: userData, error: userError } = await supabaseClient.auth.admin.createUser({
        email: florist.email,
        password: florist.password,
        email_confirm: true,
        user_metadata: {
          full_name: florist.storeName,
          role: "florist"
        }
      })

      if (userError) throw userError

      if (userData.user) {
        // Update the profile to florist role
        const { error: profileError } = await supabaseClient
          .from('profiles')
          .update({ role: 'florist', phone: florist.phone })
          .eq('id', userData.user.id)

        if (profileError) throw profileError

        // Create the florist profile
        const { error: floristError } = await supabaseClient
          .from('florist_profiles')
          .insert({
            id: userData.user.id,
            store_name: florist.storeName,
            address: '123 Example St, Sydney NSW 2000',
            about_text: 'A lovely local florist.'
          })

        if (floristError) throw floristError

        // Add sample products
        const sampleProducts = [
          {
            title: 'Spring Bouquet',
            description: 'A beautiful arrangement of seasonal spring flowers',
            price: 89.99,
            category: 'bouquet',
            occasion: ['birthday', 'congratulations'],
            florist_id: userData.user.id
          },
          {
            title: 'Rose Bundle',
            description: 'Classic red roses, perfect for any romantic occasion',
            price: 129.99,
            category: 'roses',
            occasion: ['anniversary', 'valentine'],
            florist_id: userData.user.id
          }
        ]

        const { error: productsError } = await supabaseClient
          .from('products')
          .insert(sampleProducts)

        if (productsError) throw productsError

        createdFlorists.push(florist.storeName)
      }
    }

    return new Response(
      JSON.stringify({ success: true, created: createdFlorists }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Setup error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})