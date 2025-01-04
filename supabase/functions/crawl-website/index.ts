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
      throw new Error('Firecrawl API key not configured')
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

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          crawlResult: {
            success: false,
            error: crawlResponse.error || 'Failed to crawl website'
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Process the crawled data
    const processedData = {
      title: crawlResponse.title || '',
      description: crawlResponse.description || '',
      products: crawlResponse.products || [],
      contact: crawlResponse.contact || {}
    }

    return new Response(
      JSON.stringify({
        crawlResult: {
          success: true,
          status: 'completed',
          data: processedData
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        crawlResult: {
          success: false,
          error: error.message
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})