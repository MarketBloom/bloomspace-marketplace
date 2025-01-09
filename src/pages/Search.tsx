import { FilterBar } from "@/components/FilterBar";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearch from "./MobileSearch";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Search = () => {
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['search-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_hidden', false);
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: florists = [], isLoading: isLoadingFlorists } = useQuery({
    queryKey: ['search-florists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('florist_profiles')
        .select('*')
        .eq('store_status', 'published');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isMobile) {
    return <MobileSearch />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 z-10">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 80}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-primary/10"
        />
      </div>
      <div className="relative z-20">
        <SearchHeader viewMode={viewMode} setViewMode={setViewMode} />
        <div className="container mx-auto px-4 py-8">
          <FilterBar />
          <SearchResults 
            viewMode={viewMode}
            products={products}
            florists={florists}
            isLoadingProducts={isLoadingProducts}
            isLoadingFlorists={isLoadingFlorists}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;