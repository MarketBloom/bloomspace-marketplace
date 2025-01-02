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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-medium tracking-tight">Featured Arrangements</h2>
            <p className="text-gray-600 mt-1">Fresh picks from local artisan florists</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/search')}
            className="hidden md:flex"
          >
            View All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/search')}
                className="md:hidden"
              >
                View All
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};