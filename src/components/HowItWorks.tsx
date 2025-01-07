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
          Support local florists
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-[800px] mx-auto mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
          Connect with talented local artisans and get fresh flowers delivered when you need them
        </p>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Local Florists */}
          <div className="bg-secondary rounded-2xl p-8 border border-[#eed2d8]">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Local Artisans</h3>
                <p className="text-muted-foreground">
                  Support talented florists in your community crafting unique arrangements
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Flower className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Care & Support */}
          <div className="bg-secondary rounded-2xl p-8 border border-[#eed2d8]">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Crafted with Care</h3>
                <p className="text-muted-foreground">
                  Every arrangement is made with love and backed by our satisfaction guarantee
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-2/3 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Easy Filters */}
          <div className="bg-secondary rounded-2xl p-8 border border-[#eed2d8]">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Easy to Find</h3>
                <p className="text-muted-foreground">
                  Filter by occasion, style, and budget to find your perfect arrangement
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Filter className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-secondary rounded-2xl p-8 border border-[#eed2d8]">
            <div className="aspect-square flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Quick Delivery</h3>
                <p className="text-muted-foreground">
                  Same-day delivery available for those last-minute moments
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