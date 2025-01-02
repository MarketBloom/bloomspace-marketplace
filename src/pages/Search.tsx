import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Search = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: products, isLoading } = useQuery({
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

  const FilterPanel = () => (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <FilterBar />
      </div>
    </div>
  );

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
              <p className="text-lg text-muted-foreground text-center mb-8 font-light">
                Browse our collection of fresh, locally-sourced arrangements
              </p>
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
              {isLoading ? (
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
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;