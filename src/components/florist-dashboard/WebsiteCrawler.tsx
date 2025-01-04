import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any;
  error?: string;
}

export const WebsiteCrawler = ({ floristId }: { floristId: string }) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      console.log('Sending crawl request for URL:', url);
      
      const { data, error } = await supabase.functions.invoke('crawl-website', {
        body: { url, floristId }
      });

      console.log('Received response:', data);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (!data?.crawlResult) {
        throw new Error('Invalid response format');
      }
      
      if (data.crawlResult.success) {
        toast({
          title: "Success",
          description: "Website data extracted successfully",
          duration: 3000,
        });
        setCrawlResult(data.crawlResult);
        setProgress(100);
      } else {
        throw new Error(data.crawlResult.error || 'Failed to extract website data');
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process website",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Import from Website</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            Your Website URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-flower-shop.com"
            required
          />
        </div>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Import Data"}
        </Button>
      </form>

      {crawlResult && (
        <div className="mt-6 space-y-4">
          <h3 className="text-md font-semibold">Extracted Data</h3>
          <div className="space-y-2 text-sm">
            <p>Status: {crawlResult.status}</p>
            {crawlResult.data && (
              <div className="mt-4">
                <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60 text-xs">
                  {JSON.stringify(crawlResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};