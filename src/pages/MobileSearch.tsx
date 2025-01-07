import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { MobileSearchResults } from "@/components/search/mobile/MobileSearchResults";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

const MobileSearch = () => {
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

  return (
    <div className="min-h-screen bg-[#eed2d8]">
      <Header />
      
      <div className="relative">
        <div className="relative z-10 px-4 pt-[72px]">
          <MobileFilterButton />

          <div className="mt-4">
            <SearchHeader viewMode={viewMode} setViewMode={setViewMode} />
            <MobileSearchResults 
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

export default MobileSearch;
