import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

interface FeaturedProductsProps {
  products: any[];
  isLoading: boolean;
  navigate: (path: string) => void;
}

export const FeaturedProducts = ({ products, isLoading, navigate }: FeaturedProductsProps) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Arrangements</h2>
            <p className="text-gray-600 text-lg">Fresh picks from local artisan florists</p>
          </div>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate('/search')}
          >
            View All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                images={product.images}
                floristName={product.florist_profiles?.store_name}
                floristId={product.florist_id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};