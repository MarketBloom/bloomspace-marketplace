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
import { toast } from "sonner";

const Search = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', fulfillmentType, searchParams.toString()],
    queryFn: async () => {
      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;
      const location = searchParams.get('location');

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
            operating_hours,
            coordinates,
            delivery_radius
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
        // Skip products from florists outside delivery radius if location is specified
        if (location && userCoordinates && product.florist_profiles?.coordinates) {
          const floristCoords = JSON.parse(String(product.florist_profiles.coordinates));
          const distance = window.calculate_distance(
            userCoordinates[0],
            userCoordinates[1],
            floristCoords[0],
            floristCoords[1]
          );
          
          if (distance > (product.florist_profiles.delivery_radius || 0)) {
            return [];
          }
        }

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
            currentTime < product.florist_profiles?.delivery_end_time,
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
    queryKey: ['florists', searchParams.toString()],
    queryFn: async () => {
      const location = searchParams.get('location');
      let query = supabase
        .from('florist_profiles')
        .select(`
          id,
          store_name,
          address,
          about_text,
          operating_hours,
          delivery_fee,
          delivery_radius,
          minimum_order_amount,
          logo_url,
          banner_url,
          social_links,
          store_status,
          coordinates
        `)
        .eq('store_status', 'published');

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      // Filter florists based on location and delivery radius if location is specified
      if (location && userCoordinates && data) {
        return data.filter(florist => {
          if (!florist.coordinates) return false;
          
          const floristCoords = JSON.parse(String(florist.coordinates));
          const distance = window.calculate_distance(
            userCoordinates[0],
            userCoordinates[1],
            floristCoords[0],
            floristCoords[1]
          );
          
          return distance <= (florist.delivery_radius || 0);
        });
      }

      return data || [];
    },
  });

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.remove();
        }
        
        // Fetch API key from Edge Function
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error || !data?.apiKey) {
          throw new Error(error?.message || 'Failed to fetch API key');
        }

        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            setIsGoogleMapsLoaded(true);
            resolve();
          };
          script.onerror = () => {
            reject(new Error('Failed to load Google Maps script'));
          };
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        toast.error("Error loading location services. Please try again.");
      }
    };

    loadGoogleMaps();

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Handle location changes
  useEffect(() => {
    const location = searchParams.get('location');
    if (location && isGoogleMapsLoaded && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setUserCoordinates([lat(), lng()]);
        }
      });
    }
  }, [searchParams, isGoogleMapsLoaded]);

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