import { Flower, Heart, Filter, Truck } from "lucide-react";
import { MobileHowItWorks } from "./MobileHowItWorks";
import { useIsMobile } from "@/hooks/use-mobile";

export const HowItWorks = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHowItWorks />;
  }

  return (
    <section className="hidden md:block py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-4">
          Your city's best florists
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-[800px] mx-auto mb-12">
          Discover our handpicked selection of exceptional local florists, all in one convenient place
        </p>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Local Excellence */}
          <div className="bg-[#eed2d8] rounded-2xl p-8">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Local Excellence</h3>
                <p className="text-muted-foreground">
                  Support the finest florists in your community creating stunning arrangements
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Flower className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Quality Guaranteed */}
          <div className="bg-[#eed2d8] rounded-2xl p-8">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Every arrangement is crafted with care and backed by our satisfaction guarantee
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-2/3 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Simple Shopping */}
          <div className="bg-[#eed2d8] rounded-2xl p-8">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Simple Shopping</h3>
                <p className="text-muted-foreground">
                  Find your perfect arrangement by occasion, style, and budget
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Filter className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Quick Delivery */}
          <div className="bg-[#eed2d8] rounded-2xl p-8">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Quick Delivery</h3>
                <p className="text-muted-foreground">
                  Same-day delivery available for those special moments
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Truck className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};