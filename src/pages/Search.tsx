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
import { format } from "date-fns";

const Search = () => {
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");
  const isMobile = useIsMobile();

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', fulfillmentType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name,
            address,
            delivery_cutoff,
            delivery_start_time,
            delivery_end_time,
            operating_hours
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;

      // Filter products based on fulfillment type and time constraints
      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');

      return data.map(product => ({
        ...product,
        isDeliveryAvailable: fulfillmentType === "delivery" && 
          product.florist_profiles?.delivery_cutoff && 
          currentTime < product.florist_profiles.delivery_cutoff,
        isPickupAvailable: fulfillmentType === "pickup" && 
          product.florist_profiles?.operating_hours && 
          currentTime < product.florist_profiles.delivery_end_time,
        deliveryCutoff: product.florist_profiles?.delivery_cutoff,
        pickupCutoff: product.florist_profiles?.delivery_end_time
      }));
    },
  });

  const { data: florists, isLoading: isLoadingFlorists } = useQuery({
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
    <div className="w-full">
      <div>
        <h3 className="text-sm font-medium mb-3">Filters</h3>
        <FilterBar />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="lg:grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8">
            <FilterPanel />
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
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
            <div className="flex gap-2 mb-4">
              <Button
                variant={viewMode === 'products' ? 'default' : 'outline'}
                onClick={() => setViewMode('products')}
                className={`flex-1 sm:flex-none text-sm ${
                  viewMode === 'products' 
                    ? 'bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black' 
                    : ''
                } rounded-full`}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Products
              </Button>
              <Button
                variant={viewMode === 'florists' ? 'default' : 'outline'}
                onClick={() => setViewMode('florists')}
                className={`flex-1 sm:flex-none text-sm ${
                  viewMode === 'florists' 
                    ? 'bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black' 
                    : ''
                } rounded-full`}
              >
                <Store className="h-4 w-4 mr-2" />
                Florists
              </Button>
            </div>

            {/* Products View */}
            {viewMode === 'products' && (
              isLoadingProducts ? (
                <div className="flex justify-center items-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin text-[#A8A646]" />
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="animate-fade-in-up">
                      <ProductCard
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        images={product.images}
                        floristName={product.florist_profiles?.store_name}
                        floristId={product.florist_id}
                        isDeliveryAvailable={product.isDeliveryAvailable}
                        isPickupAvailable={product.isPickupAvailable}
                        deliveryCutoff={product.deliveryCutoff}
                        pickupCutoff={product.pickupCutoff}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria or switching fulfillment method
                  </p>
                </div>
              )
            )}

            {viewMode === 'florists' && (
              isLoadingFlorists ? (
                <div className="flex justify-center items-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin text-[#A8A646]" />
                </div>
              ) : florists && florists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {florists.map((florist) => (
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
    </div>
  );
};

export default Search;
