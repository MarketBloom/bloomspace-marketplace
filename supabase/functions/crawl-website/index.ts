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
          status: 200
        }
      )
    }

    console.log('Starting crawl for URL:', url)
    console.log('Using API key:', apiKey.substring(0, 5) + '...')

    // Make request to Firecrawl API
    const response = await fetch('https://api.firecrawl.com/v1/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html']
        }
      })
    })

    console.log('Firecrawl API response status:', response.status)
    
    const responseData = await response.json()
    console.log('Firecrawl API response:', responseData)

    if (!response.ok) {
      console.error('Firecrawl API error:', responseData)
      return new Response(
        JSON.stringify({
          crawlResult: {
            success: false,
            error: responseData.error || 'Failed to crawl website',
            details: responseData
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    return new Response(
      JSON.stringify({
        crawlResult: {
          success: true,
          status: 'completed',
          data: {
            title: responseData.title || '',
            description: responseData.description || '',
            products: responseData.products || [],
            contact: responseData.contact || {}
          }
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error in crawl-website function:', error)
    return new Response(
      JSON.stringify({
        crawlResult: {
          success: false,
          error: error.message || 'Internal server error',
          details: error
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  }
})