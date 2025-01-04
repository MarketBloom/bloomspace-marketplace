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
    if (isLoadingProducts) {
      return (
        <div className="flex justify-center items-center h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#A8A646]" />
        </div>
      );
    }

    if (!products?.length) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria or switching fulfillment method
          </p>
        </div>
      );
    }

    return (
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
    );
  }

  if (isLoadingFlorists) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#A8A646]" />
      </div>
    );
  }

  if (!florists?.length) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">No florists found</h2>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
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
  );
};