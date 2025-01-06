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
    <section className="py-8 bg-[#000000]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Featured Arrangements</h2>
            <p className="text-base text-white/80 mt-1">Fresh picks from local artisan florists</p>
          </div>
          <Button 
            variant="secondary"
            onClick={() => navigate('/search')}
            className="hidden md:flex bg-[#1A1F2C] text-white hover:bg-[#2A2F3C]"
          >
            View All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  displayPrice={product.displayPrice || product.price}
                  description={product.description}
                  images={product.images}
                  floristName={product.florist_profiles?.store_name}
                  floristId={product.florist_id}
                  displaySize={product.displaySize}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="secondary"
                onClick={() => navigate('/search')}
                className="md:hidden bg-[#1A1F2C] text-white hover:bg-[#2A2F3C]"
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