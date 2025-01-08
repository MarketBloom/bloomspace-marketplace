import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ApprovalRequest {
  applicationId: string;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { applicationId } = await req.json() as ApprovalRequest

    // 1. Get the application details
    const { data: application, error: fetchError } = await supabaseClient
      .from('florist_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      throw new Error('Application not found')
    }

    // 2. Create auth user for the florist
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email: application.email,
      email_confirm: true,
      user_metadata: {
        full_name: application.full_name,
        role: 'florist'
      },
      password: crypto.randomUUID() // Generate a random password
    })

    if (authError) throw authError

    // 3. Create florist profile
    const { error: profileError } = await supabaseClient
      .from('florist_profiles')
      .insert({
        id: authData.user.id,
        store_name: application.store_name || '',
        address: application.address || '',
        about_text: application.about_business,
        store_status: 'private'
      })

    if (profileError) throw profileError

    // 4. Update application status
    const { error: updateError } = await supabaseClient
      .from('florist_applications')
      .update({ status: 'approved' })
      .eq('id', applicationId)

    if (updateError) throw updateError

    // 5. Send welcome email via the send-notification function
    await supabaseClient.functions.invoke('send-notification', {
      body: {
        to: [application.email],
        subject: 'Welcome to Lovable Flowers - Your Application is Approved!',
        html: `
          <h1>Welcome to Lovable Flowers!</h1>
          <p>Dear ${application.full_name},</p>
          <p>We're excited to inform you that your application to join Lovable Flowers has been approved!</p>
          <p>You can now log in to your account using your email address. For security reasons, please use the password reset function on the login page to set your password.</p>
          <p>Get started by completing your store profile and adding your first products.</p>
          <p>Welcome aboard!</p>
          <p>Best regards,<br>The Lovable Flowers Team</p>
        `
      }
    })

    return new Response(
      JSON.stringify({ success: true, userId: authData.user.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Error in approve-florist-application:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})