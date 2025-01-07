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
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

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

  useEffect(() => {
    const fulfillment = searchParams.get('fulfillment');
    if (fulfillment === 'pickup' || fulfillment === 'delivery') {
      setFulfillmentType(fulfillment);
    }
  }, [searchParams]);

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
              currentTime < product.florist_profiles.delivery_end_time,
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

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <div className="relative">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 h-[50vh] min-h-[400px]">
          <img 
            src="/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png"
            alt="Beautiful pink and coral carnations arranged with dramatic shadows"
            className="h-full w-full object-cover"
            style={{ 
              objectPosition: '50% 50%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 lg:max-w-[1800px] mx-auto lg:px-4 pt-20">
          <div className="lg:grid lg:grid-cols-[260px_1fr] gap-4">
            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-3 text-white">Filters</h3>
                <FilterBar 
                  initialFulfillmentType={fulfillmentType}
                  initialDate={searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined}
                  initialTime={searchParams.get('time') || null}
                  initialBudget={searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500]}
                  initialLocation={searchParams.get('location') || ""}
                  onFilterChange={updateSearchParams}
                />
              </div>
            </aside>

            <MobileFilterButton />

            {/* Main Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:p-6 px-4 mt-4 lg:mt-0 border border-black">
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