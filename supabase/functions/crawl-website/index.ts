import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url, floristId } = await req.json()
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')

    if (!apiKey) {
      throw new Error('Firecrawl API key not configured')
    }

    const firecrawl = new FirecrawlApp({ apiKey })
    console.log('Starting crawl for URL:', url)

    const crawlResponse = await firecrawl.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    })

    if (!crawlResponse.success) {
      throw new Error(crawlResponse.error || 'Failed to crawl website')
    }

    // Process the crawled data to extract relevant information
    const processedData = processCrawledData(crawlResponse.data)

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

function processCrawledData(data: any) {
  // Extract relevant information from the crawled data
  // This is a basic example - you can enhance this based on your needs
  const processedData = {
    title: '',
    description: '',
    products: [],
    contact: {},
  }

  // Process the crawled data to extract relevant information
  // This is where you'd implement the logic to parse the website content
  // and structure it for your application

  return processedData
}