import { ProductCard } from "@/components/ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  products: any[];
  isDoubleColumn: boolean;
}

export const ProductGrid = ({ products, isDoubleColumn }: ProductGridProps) => {
  const isMobile = useIsMobile();

  const getGridClassName = () => {
    if (!isMobile) {
      return "grid grid-cols-3 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 gap-3";
    }
    // Always use 2 columns on mobile with minimal gap and no padding
    return "grid grid-cols-2 gap-0.5 px-0.5";
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