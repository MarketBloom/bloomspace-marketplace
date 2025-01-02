import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { Loader2 } from "lucide-react";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 12;

interface SearchResultsProps {
  viewMode: 'products' | 'florists';
  page: number;
  setPage: (page: number) => void;
}

export const SearchResults = ({ viewMode, page, setPage }: SearchResultsProps) => {
  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name,
            address
          )
        `, { count: 'exact' })
        .eq('in_stock', true)
        .eq('is_hidden', false)
        .range(start, end);

      if (error) throw error;
      return { items: data || [], total: count || 0 };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    placeholderData: (prev) => prev,
  });

  const { data: floristsData, isLoading: isLoadingFlorists } = useQuery({
    queryKey: ['florists', page],
    queryFn: async () => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('florist_profiles')
        .select('*', { count: 'exact' })
        .range(start, end);

      if (error) throw error;
      return { items: data || [], total: count || 0 };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    placeholderData: (prev) => prev,
  });

  const isLoading = viewMode === 'products' ? isLoadingProducts : isLoadingFlorists;
  const data = viewMode === 'products' ? productsData : floristsData;
  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data?.items || data.items.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">
          No {viewMode === 'products' ? 'products' : 'florists'} found
        </h2>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {viewMode === 'products' ? (
          data.items.map((product) => (
            <div key={product.id} className="animate-fade-in-up">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                images={product.images}
                floristName={product.florist_profiles?.store_name}
                floristId={product.florist_id}
              />
            </div>
          ))
        ) : (
          data.items.map((florist) => (
            <div key={florist.id} className="animate-fade-in-up">
              <FloristCard
                id={florist.id}
                storeName={florist.store_name}
                address={florist.address}
                aboutText={florist.about_text}
              />
            </div>
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </>
  );
};