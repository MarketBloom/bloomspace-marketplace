import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

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
  const [selectedItems, setSelectedItems] = useState<{ id: string, sizeId: string | null }[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleSelect = (id: string, sizeId: string | null) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.id === id && item.sizeId === sizeId);
      if (isSelected) {
        return prev.filter(item => !(item.id === id && item.sizeId === sizeId));
      } else {
        return [...prev, { id, sizeId }];
      }
    });
  };

  const handleBatchAddToCart = () => {
    // Here you would implement the logic to add multiple items to cart
    toast.success(`Added ${selectedItems.length} items to cart`);
    setSelectedItems([]);
    setSelectionMode(false);
  };

  if (viewMode === 'products') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {isLoadingProducts ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              `${products.length} Products Found`
            )}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectionMode(!selectionMode);
              if (!selectionMode) {
                setSelectedItems([]);
              }
            }}
          >
            {selectionMode ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Done
              </>
            ) : (
              'Select Multiple'
            )}
          </Button>
        </div>

        {selectionMode && selectedItems.length > 0 && (
          <div className="sticky top-0 z-10 bg-background p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {selectedItems.length} items selected
              </span>
              <Button size="sm" onClick={handleBatchAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={`${product.id}-${product.sizeId || 'default'}`}
              {...product}
              isSelected={selectedItems.some(
                item => item.id === product.id && item.sizeId === product.sizeId
              )}
              onSelect={handleSelect}
              selectionMode={selectionMode}
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
          <FloristCard key={florist.id} {...florist} />
        ))}
      </div>
    </div>
  );
};