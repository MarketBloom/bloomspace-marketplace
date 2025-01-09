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
    <section className="hidden md:block py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GooeyText
            texts={["Your city's best florists", "All in one place"]}
            morphTime={2}
            cooldownTime={1.5}
            className="font-bold"
            textClassName="text-6xl"
          />
          <p className="text-lg text-muted-foreground max-w-[800px] mx-auto mt-4">
            Discover our handpicked selection of exceptional local florists, all in one convenient place
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-[#eed2d8] rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Flower className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Local Excellence</h3>
            <p className="text-muted-foreground">
              Support the finest florists in your community creating stunning arrangements
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Seamless Selection</h3>
            <p className="text-muted-foreground">
              Browse and filter arrangements from our florists, and complete your order in one place
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Filter className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Checkout</h3>
            <p className="text-muted-foreground">
              Shop with confidence using our safe and effortless payment system
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#eed2d8] rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Truck className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Doorstep Delivery</h3>
            <p className="text-muted-foreground">
              Your beautiful arrangement delivered right to your door, same day available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};