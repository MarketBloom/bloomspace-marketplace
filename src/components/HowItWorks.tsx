import { Flower, Heart, Filter, Truck } from "lucide-react";
import { MobileHowItWorks } from "./MobileHowItWorks";
import { useIsMobile } from "@/hooks/use-mobile";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const HowItWorks = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHowItWorks />;
  }

  return (
    <section className="hidden md:block py-8">
      <div className="container mx-auto px-4">
        <div className="h-[100px]">
          <GooeyText
            texts={["Your city's best florists", "All in one place"]}
            morphTime={2}
            cooldownTime={1.5}
            className="font-bold"
            textClassName="text-6xl"
          />
        </div>
        <p className="text-lg text-muted-foreground text-center max-w-[800px] mx-auto mb-8">
          Discover our handpicked selection of exceptional local florists, all in one convenient place
        </p>

        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-[#eed2d8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Browse & Filter</h3>
            <p className="text-muted-foreground">
              Find the perfect arrangement with our easy-to-use filters
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Florist</h3>
            <p className="text-muted-foreground">
              Select from our curated list of talented local florists
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customize Your Order</h3>
            <p className="text-muted-foreground">
              Add your personal touch to make it extra special
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Enjoy reliable same-day delivery to your doorstep
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};