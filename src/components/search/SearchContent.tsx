import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MobileFilterButton } from "./MobileFilterButton";
import { SearchHeader } from "./SearchHeader";
import { SearchResults } from "./SearchResults";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { useSearchFlorists } from "./hooks/useSearchFlorists";

interface SearchContentProps {
  userCoordinates: [number, number] | null;
}

export const SearchContent = ({ userCoordinates }: SearchContentProps) => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

  const { data: products, isLoading: isLoadingProducts } = useSearchProducts({
    fulfillmentType,
    searchParams,
    userCoordinates
  });

  const { data: florists, isLoading: isLoadingFlorists } = useSearchFlorists({
    searchParams,
    userCoordinates
  });

  return (
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
  );
};