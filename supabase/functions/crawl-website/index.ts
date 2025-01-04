import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

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
      throw new Error('API configuration error')
    }

    console.log('Starting crawl for URL:', url)
    console.log('Using API key starting with:', apiKey.substring(0, 5))

    // Basic URL validation
    try {
      const urlObj = new URL(url)
      if (!urlObj.protocol.startsWith('http')) {
        throw new Error('Invalid URL protocol')
      }
    } catch {
      throw new Error('Invalid URL format')
    }

    // First try to fetch the URL to validate it's accessible
    try {
      const testResponse = await fetch(url)
      if (!testResponse.ok) {
        throw new Error(`URL returned status ${testResponse.status}`)
      }
    } catch (error) {
      console.error('URL validation error:', error)
      throw new Error('Website is not accessible')
    }

    // Make the crawl request
    const crawlResponse = await fetch('https://api.firecrawl.com/v1/crawl', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        url,
        limit: 5, // Reduced limit for testing
        scrapeOptions: {
          formats: ['markdown', 'html'],
          selectors: {
            title: 'h1, title',
            description: 'meta[name="description"], p',
            products: '.product, [data-product], .woocommerce-loop-product',
            prices: '.price, [data-price]',
            images: 'img, [data-image]'
          }
        }
      })
    })

    console.log('Firecrawl response status:', crawlResponse.status)
    
    if (!crawlResponse.ok) {
      const errorText = await crawlResponse.text()
      console.error('Firecrawl API error response:', errorText)
      throw new Error(`Firecrawl API error: ${crawlResponse.status} - ${errorText}`)
    }

    const data = await crawlResponse.json()
    console.log('Firecrawl API success response:', JSON.stringify(data, null, 2))

    return new Response(
      JSON.stringify({
        crawlResult: {
          success: true,
          status: 'completed',
          data: {
            url,
            crawledAt: new Date().toISOString(),
            content: data
          }
        }
      }),
      { headers: corsHeaders }
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
      { headers: corsHeaders }
    )
  }
})