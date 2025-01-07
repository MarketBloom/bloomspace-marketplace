import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearch from "./MobileSearch";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";
import { DeliveryInfo } from "@/components/search/DeliveryInfo";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

const Search = () => {
  // Move all hooks to the top level
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

  // Extract common query logic
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', fulfillmentType, searchParams.toString()],
    queryFn: async () => {
      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;

      const { data: productsData, error } = await supabase
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
          ),
          product_sizes (
            id,
            name,
            price_adjustment,
            images
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;

      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');

      const productsWithVariants = productsData.flatMap(product => {
        if (!product.product_sizes || product.product_sizes.length === 0) {
          return [{
            ...product,
            displaySize: null,
            displayPrice: product.price,
            sizeId: null,
            floristName: product.florist_profiles?.store_name,
            isDeliveryAvailable: fulfillmentType === "delivery" && 
              product.florist_profiles?.delivery_cutoff && 
              currentTime < product.florist_profiles.delivery_cutoff,
            isPickupAvailable: fulfillmentType === "pickup" && 
              product.florist_profiles?.operating_hours && 
              currentTime < product.florist_profiles?.delivery_end_time,
            deliveryCutoff: product.florist_profiles?.delivery_cutoff,
            pickupCutoff: product.florist_profiles?.delivery_end_time
          }];
        }

        return product.product_sizes.map(size => ({
          ...product,
          displaySize: size.name,
          displayPrice: product.price + (size.price_adjustment || 0),
          sizeId: size.id,
          floristName: product.florist_profiles?.store_name,
          isDeliveryAvailable: fulfillmentType === "delivery" && 
            product.florist_profiles?.delivery_cutoff && 
            currentTime < product.florist_profiles.delivery_cutoff,
          isPickupAvailable: fulfillmentType === "pickup" && 
            product.florist_profiles?.operating_hours && 
            currentTime < product.florist_profiles.delivery_end_time,
          deliveryCutoff: product.florist_profiles?.delivery_cutoff,
          pickupCutoff: product.florist_profiles?.delivery_end_time,
          images: size.images?.length ? size.images : product.images
        }));
      });

      if (maxBudget) {
        return productsWithVariants.filter(product => product.displayPrice <= maxBudget);
      }

      return productsWithVariants;
    },
  });

  const { data: florists, isLoading: isLoadingFlorists } = useQuery({
    queryKey: ['florists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('florist_profiles')
        .select('*')
        .eq('store_status', 'published');

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      return data || [];
    },
  });

  useEffect(() => {
    const fulfillment = searchParams.get('fulfillment');
    if (fulfillment === 'pickup' || fulfillment === 'delivery') {
      setFulfillmentType(fulfillment);
    }
  }, [searchParams]);

  const updateSearchParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  // Return mobile version after all hooks are initialized
  if (isMobile) {
    return <MobileSearch />;
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <div className="relative">
        <div className="relative z-10 lg:max-w-[1800px] mx-auto lg:px-4 pt-20">
          <DeliveryInfo />
          
          <div className="lg:grid lg:grid-cols-[260px_1fr] gap-4">
            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-3">Filters</h3>
                <div className="bg-[#eed2d8] rounded-lg p-3 border border-black">
                  <FilterBar 
                    initialFulfillmentType={fulfillmentType}
                    initialDate={searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined}
                    initialTime={searchParams.get('time') || null}
                    initialBudget={searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500]}
                    initialLocation={searchParams.get('location') || ""}
                    onFilterChange={updateSearchParams}
                  />
                </div>
              </div>
            </aside>

            <MobileFilterButton />

            {/* Main Content */}
            <div className="bg-[#eed2d8] rounded-2xl lg:p-6 px-4 mt-4 lg:mt-0 border border-black">
              <SearchHeader viewMode={viewMode} setViewMode={setViewMode} />
              <SearchResults 
                viewMode={viewMode}
                products={products || []}
                florists={florists || []}
                isLoadingProducts={isLoadingProducts}
                isLoadingFlorists={isLoadingFlorists}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;