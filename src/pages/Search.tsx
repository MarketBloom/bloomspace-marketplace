import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearch from "./MobileSearch";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useState, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";
import { DeliveryInfo } from "@/components/search/DeliveryInfo";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "@/components/search/hooks/useSearchProducts";
import { useSearchFlorists } from "@/components/search/hooks/useSearchFlorists";
import { useGoogleMaps } from "@/components/search/hooks/useGoogleMaps";

const Search = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);

  const { isGoogleMapsLoaded } = useGoogleMaps({ 
    searchParams, 
    onCoordsChange: setUserCoordinates 
  });

  const { data: products, isLoading: isLoadingProducts } = useSearchProducts({
    fulfillmentType,
    searchParams,
    userCoordinates
  });

  const { data: florists, isLoading: isLoadingFlorists } = useSearchFlorists({
    searchParams,
    userCoordinates
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

  if (isMobile) {
    return <MobileSearch />;
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="relative z-30">
        <Header />
        
        <div className="relative">
          <div className="relative z-10 lg:max-w-[1800px] mx-auto lg:px-4 pt-20">
            <DeliveryInfo />
            
            <div className="lg:grid lg:grid-cols-[260px_1fr] gap-4">
              {/* Sidebar */}
              <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                <div className="w-full">
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
              <div className="bg-[#eed2d8] rounded-lg lg:p-6 px-4 mt-4 lg:mt-0 border border-black">
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
    </div>
  );
};

export default Search;