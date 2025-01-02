import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { memo } from "react";

interface FeaturedProductsProps {
  products: any[];
  isLoading: boolean;
  navigate: (path: string) => void;
}

export const FeaturedProducts = memo(({ products, isLoading, navigate }: FeaturedProductsProps) => {
  // Implement stale-while-revalidate caching strategy with optimized query
  const { data: cachedProducts, isLoading: isCacheLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      console.log('Fetching featured products');
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          price,
          images,
          florist_profiles (
            store_name
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false)
        .limit(8)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 15,   // Keep unused data for 15 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
    retry: 1 // Only retry failed requests once
  });

  const displayProducts = cachedProducts || products;
  const showLoading = isLoading || isCacheLoading;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-medium tracking-tight font-mono">Featured Arrangements</h2>
            <p className="text-sm text-gray-600 mt-0.5 font-mono">Fresh picks from local artisan florists</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/search')}
            className="hidden md:flex text-xs font-mono"
          >
            View All
          </Button>
        </div>
        
        {showLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {displayProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  images={product.images}
                  floristName={product.florist_profiles?.store_name}
                  floristId={product.florist_id}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/search')}
                className="md:hidden text-xs font-mono"
              >
                View All
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

FeaturedProducts.displayName = 'FeaturedProducts';