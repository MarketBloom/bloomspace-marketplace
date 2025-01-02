import { Button } from "@/components/ui/button";
import { Shield, Truck, Clock, Heart } from "lucide-react";

export const TrustSection = ({ navigate }: { navigate: (path: string) => void }) => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "100% Satisfaction",
      description: "Every arrangement is crafted with care and backed by our satisfaction guarantee"
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Same Day Delivery",
      description: "Order by 1pm for same-day delivery in most areas"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Fresh & On Time",
      description: "We ensure your flowers arrive fresh and exactly when you need them"
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Local Artisans",
      description: "Support talented local florists in your community"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <img 
                src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                alt="Local florist creating an arrangement"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Support Local Artisan Florists</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Every arrangement is crafted with care by passionate local florists in your area. 
                Get fresh, beautiful flowers delivered right to your door or pick up from the shop, 
                all while supporting small businesses in your community.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/search')}
                className="text-base"
              >
                Find Your Local Florist
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};