import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  useEffect(() => {
    // Create scroll animations for each product card
    const cards = document.querySelectorAll('.product-card-animate');
    
    cards.forEach((card, index) => {
      // Alternate between different scroll speeds
      const speed = [0.8, 1.2, 2.0][index % 3];
      card.setAttribute('data-speed', speed.toString());

      gsap.timeline({
        scrollTrigger: {
          scrub: 1,
          trigger: card,
          start: "top 90%",
          end: "bottom 30%",
        }
      }).fromTo(card, 
        { 
          y: 50,
          opacity: 0 
        },
        { 
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [products, florists, viewMode]);

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
        <div className="grid grid-cols-3 gap-3">
          {products.map((product, index) => (
            <div 
              key={`${product.id}-${product.sizeId || 'default'}`}
              className="product-card-animate"
            >
              <ProductCard {...product} />
            </div>
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
      <div className="grid grid-cols-3 gap-3">
        {florists.map((florist) => (
          <div 
            key={florist.id}
            className="product-card-animate"
          >
            <FloristCard 
              id={florist.id}
              storeName={florist.store_name}
              address={florist.address}
              aboutText={florist.about_text}
              logoUrl={florist.logo_url}
              bannerUrl={florist.banner_url}
              deliveryFee={florist.delivery_fee}
              deliveryRadius={florist.delivery_radius}
              minimumOrderAmount={florist.minimum_order_amount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};