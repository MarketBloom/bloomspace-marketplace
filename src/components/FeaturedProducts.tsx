import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProductsProps {
  products: any[];
  isLoading: boolean;
  navigate: (path: string) => void;
}

export const FeaturedProducts = ({ products, isLoading, navigate }: FeaturedProductsProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in for product cards
      const cards = gsap.utils.toArray<HTMLElement>('.product-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-isabelline mb-4">Featured Arrangements</h2>
              <p className="text-lg text-isabelline/60">Fresh picks from local artisan florists</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/search')}
              className="hidden md:flex border-isabelline/20 text-isabelline hover:bg-isabelline/10"
            >
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Loader2 className="h-6 w-6 animate-spin text-isabelline" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <div key={product.id} className="product-card">
                    <ProductCard
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
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center md:hidden">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/search')}
                  className="border-isabelline/20 text-isabelline hover:bg-isabelline/10"
                >
                  View All
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};