import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface FirecrawlResponse {
  success: boolean;
  data?: any;
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url, floristId } = await req.json()
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')

    if (!apiKey) {
      console.error('Firecrawl API key not configured')
      throw new Error('API configuration error')
    }

    console.log('Starting crawl for URL:', url)
    console.log('API Key prefix:', apiKey.substring(0, 5))

    // First, try a simple fetch to validate the URL
    try {
      const urlValidation = await fetch(url)
      if (!urlValidation.ok) {
        throw new Error('Invalid or inaccessible URL')
      }
    } catch (error) {
      console.error('URL validation error:', error)
      throw new Error('Invalid or inaccessible URL')
    }

    // Make request to Firecrawl API
    const firecrawlResponse = await fetch('https://api.firecrawl.com/v1/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url,
        limit: 10, // Reduced limit for faster response
        scrapeOptions: {
          formats: ['markdown', 'html'],
          selectors: {
            title: 'h1, title',
            description: 'meta[name="description"], p',
            products: '.product, [data-product]',
            contact: '.contact, [data-contact]'
          }
        }
      })
    })

    console.log('Firecrawl response status:', firecrawlResponse.status)
    
    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text()
      console.error('Firecrawl API error:', errorText)
      throw new Error(`Firecrawl API error: ${firecrawlResponse.status} ${errorText}`)
    }

    const responseData = await firecrawlResponse.json()
    console.log('Firecrawl API response:', JSON.stringify(responseData, null, 2))

    return new Response(
      JSON.stringify({
        crawlResult: {
          success: true,
          status: 'completed',
          data: {
            url,
            crawledAt: new Date().toISOString(),
            content: responseData
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
          status: 'error',
          error: error.message || 'Failed to crawl website',
          details: {
            timestamp: new Date().toISOString(),
            errorType: error.name,
            message: error.message,
            stack: error.stack
          }
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Keep 200 to handle errors in the client
      }
    )
  }
})