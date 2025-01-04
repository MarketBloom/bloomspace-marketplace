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
    // Set fulfillment type
    const fulfillment = searchParams.get('fulfillment');
    if (fulfillment === 'pickup' || fulfillment === 'delivery') {
      setFulfillmentType(fulfillment);
    }

    // Set date (default to today if not provided)
    const dateParam = searchParams.get('date');
    const initialDate = dateParam ? new Date(dateParam) : new Date();
    
    // Set time
    const timeParam = searchParams.get('time');
    
    // Set budget
    const budgetParam = searchParams.get('budget');
    const initialBudget = budgetParam ? [parseInt(budgetParam)] : [500];
    
    // Set location
    const locationParam = searchParams.get('location');
    
    // Pass all these values to FilterBar component
    // You'll need to update FilterBar to accept these as props
  }, [searchParams]);

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
                  initialDate={searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date()}
                  initialTime={searchParams.get('time')}
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