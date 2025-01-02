import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, SlidersHorizontal, Store, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ITEMS_PER_PAGE = 12;

const Search = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

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
      return { items: data, total: count };
    },
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
      return { items: data, total: count };
    },
  });

  const totalPages = viewMode === 'products' 
    ? Math.ceil((productsData?.total || 0) / ITEMS_PER_PAGE)
    : Math.ceil((floristsData?.total || 0) / ITEMS_PER_PAGE);

  const FilterPanel = () => (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-4 font-mono">Filters</h3>
        <FilterBar />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <main>
        <div className="relative bg-white border-b">
          <div className="container mx-auto px-4 pt-28 pb-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight animate-fade-in">
                Find Your Perfect Flowers
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-4 animate-fade-in-up">
                Browse our collection of fresh, locally-sourced arrangements
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-12">
              <FilterPanel />
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full text-sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <FilterPanel />
                </SheetContent>
              </Sheet>
            </div>

            {/* Main Content */}
            <div>
              {/* View Toggle */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={viewMode === 'products' ? 'default' : 'outline'}
                  onClick={() => {
                    setViewMode('products');
                    setPage(1);
                  }}
                  className="flex-1 sm:flex-none animate-fade-in text-sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Products
                </Button>
                <Button
                  variant={viewMode === 'florists' ? 'default' : 'outline'}
                  onClick={() => {
                    setViewMode('florists');
                    setPage(1);
                  }}
                  className="flex-1 sm:flex-none animate-fade-in text-sm"
                >
                  <Store className="h-4 w-4 mr-2" />
                  Florists
                </Button>
              </div>

              {/* Products View */}
              {viewMode === 'products' && (
                isLoadingProducts ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : productsData?.items && productsData.items.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {productsData.items.map((product) => (
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
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-8 flex justify-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <span className="flex items-center px-4">
                          Page {page} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-2">No products found</h2>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )
              )}

              {/* Florists View */}
              {viewMode === 'florists' && (
                isLoadingFlorists ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : floristsData?.items && floristsData.items.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {floristsData.items.map((florist) => (
                        <div key={florist.id} className="animate-fade-in-up">
                          <FloristCard
                            id={florist.id}
                            storeName={florist.store_name}
                            address={florist.address}
                            aboutText={florist.about_text}
                          />
                        </div>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-8 flex justify-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <span className="flex items-center px-4">
                          Page {page} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-2">No florists found</h2>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;