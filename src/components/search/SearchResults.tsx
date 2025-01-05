import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  viewMode: 'products' | 'florists';
  products: any[];
  florists: any[];
  isLoadingProducts: boolean;
  isLoadingFlorists: boolean;
}

export const SearchResults = ({ 
  viewMode, 
  products, 
  florists,
  isLoadingProducts,
  isLoadingFlorists 
}: SearchResultsProps) => {
  if (viewMode === 'products') {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          {isLoadingProducts ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            `${products.length} Products Found`
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={`${product.id}-${product.sizeId || 'default'}`}
              {...product}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {isLoadingFlorists ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          `${florists.length} Florists Found`
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {florists.map((florist) => (
          <FloristCard 
            key={florist.id}
            id={florist.id}
            storeName={florist.store_name}
            address={florist.address}
            aboutText={florist.about_text}
            logoUrl={florist.logo_url}
            bannerUrl={florist.banner_url}
            deliveryFee={florist.delivery_fee}
            deliveryRadius={florist.delivery_radius}
          />
        ))}
      </div>
    </div>
  );
};