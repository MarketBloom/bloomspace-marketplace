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
import { setupPlaceholderFlorists } from "@/utils/setupPlaceholderFlorists";

const Search = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');

  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name,
            address
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;
      return data;
    },
  });

  const { data: florists, isLoading: isLoadingFlorists, refetch: refetchFlorists } = useQuery({
    queryKey: ['florists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('florist_profiles')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const FilterPanel = () => (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <FilterBar />
      </div>
    </div>
  );

  const handleSetupFlorists = async () => {
    await setupPlaceholderFlorists();
    await Promise.all([
      refetchProducts(),
      refetchFlorists()
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="relative bg-white border-b">
          <div className="container mx-auto px-4 pt-28 pb-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
                Find Your Perfect Flowers
              </h1>
              <p className="text-lg text-muted-foreground text-center mb-4 font-light">
                Browse our collection of fresh, locally-sourced arrangements
              </p>
              {(!florists || florists.length === 0) && (
                <div className="text-center">
                  <Button 
                    onClick={handleSetupFlorists}
                    className="mx-auto"
                  >
                    Setup Placeholder Florists
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-12">
              <FilterPanel />
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
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
                  onClick={() => setViewMode('products')}
                  className="flex-1 sm:flex-none"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Products
                </Button>
                <Button
                  variant={viewMode === 'florists' ? 'default' : 'outline'}
                  onClick={() => setViewMode('florists')}
                  className="flex-1 sm:flex-none"
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
                ) : products && products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
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
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-2">No products found</h2>
                    <p className="text-muted-foreground">
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
                ) : florists && florists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {florists.map((florist) => (
                      <FloristCard
                        key={florist.id}
                        id={florist.id}
                        storeName={florist.store_name}
                        address={florist.address}
                        aboutText={florist.about_text}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-2">No florists found</h2>
                    <p className="text-muted-foreground">
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
