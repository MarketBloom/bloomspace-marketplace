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
    <section ref={sectionRef} className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-3 md:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 md:mb-4">Featured Arrangements</h2>
              <p className="text-base md:text-lg text-black/60">Fresh picks from local artisan florists</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/search')}
              className="hidden md:flex hover:bg-selective_yellow hover:text-black border-selective_yellow/20 text-selective_yellow"
            >
              View All
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Loader2 className="h-6 w-6 animate-spin text-selective_yellow" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
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
              <div className="mt-8 text-center md:hidden">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/search')}
                  className="w-full sm:w-auto border-selective_yellow/20 text-selective_yellow hover:bg-selective_yellow hover:text-black"
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
