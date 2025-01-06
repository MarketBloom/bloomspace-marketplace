import { ProductCard } from "@/components/ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  products: any[];
  isDoubleColumn: boolean;
}

export const ProductGrid = ({ products, isDoubleColumn }: ProductGridProps) => {
  const isMobile = useIsMobile();

  const getGridClassName = () => {
    if (!isMobile) return "grid grid-cols-3 gap-3";
    return isDoubleColumn 
      ? "grid grid-cols-2 gap-1" // Removed px-1 to use full width
      : "grid grid-cols-1 gap-3 px-3";
  };

  return (
    <div className={getGridClassName()}>
      {products.map((product, index) => (
        <div 
          key={`${product.id}-${product.sizeId || 'default'}`}
          className={`product-card-animate ${products.length >= 7 ? 'opacity-0' : ''}`}
        >
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};