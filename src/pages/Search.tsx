import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

  // Initialize filters from URL parameters
  useEffect(() => {
    const fulfillment = searchParams.get('fulfillment');
    if (fulfillment === 'pickup' || fulfillment === 'delivery') {
      setFulfillmentType(fulfillment);
    }
  }, [searchParams]);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', fulfillmentType, searchParams.toString()],
    queryFn: async () => {
      // Get the budget filter value
      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;

      // Query products with their sizes and florist information
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
          ),
          product_sizes (
            id,
            name,
            price_adjustment
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;

      const now = new Date();
      const currentTime = format(now, 'HH:mm:ss');

      // Transform the data to create separate entries for each size variant
      const productsWithVariants = data.flatMap(product => {
        // If no sizes, return the product with base price
        if (!product.product_sizes || product.product_sizes.length === 0) {
          return [{
            ...product,
            displaySize: null,
            displayPrice: product.price,
            sizeId: null,
            isDeliveryAvailable: fulfillmentType === "delivery" && 
              product.florist_profiles?.delivery_cutoff && 
              currentTime < product.florist_profiles.delivery_cutoff,
            isPickupAvailable: fulfillmentType === "pickup" && 
              product.florist_profiles?.operating_hours && 
              currentTime < product.florist_profiles.delivery_end_time,
            deliveryCutoff: product.florist_profiles?.delivery_cutoff,
            pickupCutoff: product.florist_profiles?.delivery_end_time
          }];
        }

        // Create an entry for each size variant
        return product.product_sizes.map(size => ({
          ...product,
          displaySize: size.name,
          displayPrice: product.price + size.price_adjustment,
          sizeId: size.id,
          isDeliveryAvailable: fulfillmentType === "delivery" && 
            product.florist_profiles?.delivery_cutoff && 
            currentTime < product.florist_profiles.delivery_cutoff,
          isPickupAvailable: fulfillmentType === "pickup" && 
            product.florist_profiles?.operating_hours && 
            currentTime < product.florist_profiles.delivery_end_time,
          deliveryCutoff: product.florist_profiles?.delivery_cutoff,
          pickupCutoff: product.florist_profiles?.delivery_end_time
        }));
      });

      // Apply budget filter if present
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
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="lg:grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8">
            <div className="w-full">
              <div>
                <h3 className="text-sm font-medium mb-3">Filters</h3>
                <FilterBar 
                  initialFulfillmentType={fulfillmentType}
                  initialDate={searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined}
                  initialTime={searchParams.get('time') || null}
                  initialBudget={searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500]}
                  initialLocation={searchParams.get('location') || ""}
                />
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <MobileFilterButton />

          {/* Main Content */}
          <div>
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
  );
};

export default Search;