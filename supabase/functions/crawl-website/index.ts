import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url, floristId } = await req.json()
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')

    if (!apiKey) {
      console.error('Firecrawl API key not configured')
      return new Response(
        JSON.stringify({
          crawlResult: {
            success: false,
            error: 'API configuration error'
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 // Changed to 200 to handle error in the response body instead
        }
      )
    }

    console.log('Starting crawl for URL:', url)

    // Make direct fetch request to Firecrawl API
    const response = await fetch('https://api.firecrawl.com/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        url,
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html']
        }
      })
    })

    const crawlResponse = await response.json()
    console.log('Crawl response:', crawlResponse)

    // Always return a 200 status and handle errors in the response body
    return new Response(
      JSON.stringify({
        crawlResult: {
          success: response.ok,
          status: response.ok ? 'completed' : 'failed',
          error: !response.ok ? (crawlResponse.error || 'Failed to crawl website') : undefined,
          data: response.ok ? {
            title: crawlResponse.title || '',
            description: crawlResponse.description || '',
            products: crawlResponse.products || [],
            contact: crawlResponse.contact || {}
          } : undefined
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        crawlResult: {
          success: false,
          error: error.message || 'Internal server error'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Changed to 200 to handle error in the response body
      },
    )
  }
})