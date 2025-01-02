import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchHeader } from "@/components/search/SearchHeader";
import { ViewToggle } from "@/components/search/ViewToggle";
import { SearchResults } from "@/components/search/SearchResults";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";

const ITEMS_PER_PAGE = 12;

const Search = () => {
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [page, setPage] = useState(1);

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('products')
        .select('*, florist_profiles!inner(store_name, address)', { count: 'exact' })
        .eq('in_stock', true)
        .eq('is_hidden', false)
        .range(start, end);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      return { items: data || [], total: count || 0 };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    placeholderData: (previousData) => previousData
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

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      return { items: data || [], total: count || 0 };
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    placeholderData: (previousData) => previousData
  });

  const totalPages = viewMode === 'products' 
    ? Math.ceil((productsData?.total || 0) / ITEMS_PER_PAGE)
    : Math.ceil((floristsData?.total || 0) / ITEMS_PER_PAGE);

  const currentData = viewMode === 'products' ? productsData : floristsData;
  const isLoading = viewMode === 'products' ? isLoadingProducts : isLoadingFlorists;

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      <SearchHeader />
      
      <main>
        <div className="container mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-6">
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-12">
              <div className="w-full space-y-6">
                <div>
                  <h3 className="text-base font-semibold mb-4 font-mono">Filters</h3>
                  <FilterBar />
                </div>
              </div>
            </aside>

            <MobileFilterButton />

            <div>
              <ViewToggle 
                viewMode={viewMode} 
                setViewMode={setViewMode} 
                setPage={setPage}
              />
              
              <SearchResults 
                viewMode={viewMode}
                isLoading={isLoading}
                data={currentData}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;