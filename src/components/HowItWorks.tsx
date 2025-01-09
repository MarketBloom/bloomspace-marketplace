import { Flower, Heart, Filter, Truck, Clock, Star, Shield, Gift } from "lucide-react";
import { MobileHowItWorks } from "./MobileHowItWorks";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

const cards = [
  {
    title: "Local Excellence",
    description: "Support the finest florists in your community creating stunning arrangements",
    icon: Flower,
  },
  {
    title: "Seamless Selection",
    description: "Browse and filter arrangements from our florists, and complete your order in one place",
    icon: Heart,
  },
  {
    title: "Secure Checkout",
    description: "Shop with confidence using our safe and effortless payment system",
    icon: Filter,
  },
  {
    title: "Doorstep Delivery",
    description: "Your beautiful arrangement delivered right to your door, same day available",
    icon: Truck,
  },
  {
    title: "Real-time Updates",
    description: "Track your order and receive notifications at every step",
    icon: Clock,
  },
  {
    title: "Quality Guarantee",
    description: "Every arrangement is crafted with care and guaranteed fresh",
    icon: Star,
  },
  {
    title: "Secure Platform",
    description: "Your data and transactions are protected with enterprise-grade security",
    icon: Shield,
  },
  {
    title: "Gift Options",
    description: "Add personalized messages and special touches to your order",
    icon: Gift,
  },
];

const CarouselCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: any }) => (
  <div className="bg-[#eed2d8] rounded-2xl p-3 w-full h-[180px]"> {/* Further reduced height and padding */}
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-1">{title}</h3> {/* Further reduced text size */}
        <p className="text-xs text-muted-foreground leading-tight"> {/* Added leading-tight for better text fit */}
          {description}
        </p>
      </div>
      <div className="bg-white rounded-xl p-1.5 mt-1"> {/* Further reduced padding and margin */}
        <Icon className="w-4 h-4 text-primary mb-1" /> {/* Further reduced icon size */}
        <div className="h-0.5 bg-muted rounded-full w-3/4 mb-0.5" /> {/* Reduced decorative elements */}
        <div className="h-0.5 bg-muted rounded-full w-1/2" />
      </div>
    </div>
  </div>
);

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
        
        <div className="h-[220px]"> {/* Further reduced container height */}
          <ThreeDPhotoCarousel 
            cards={cards.map((card, index) => (
              <CarouselCard key={index} {...card} />
            ))}
          />
        </div>
      </div>
    </section>
  );
};