import { Button } from "@/components/ui/button";
import { Shield, Truck, Clock, Heart } from "lucide-react";

export const TrustSection = ({ navigate }: { navigate: (path: string) => void }) => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "100% Satisfaction",
      description: "Every arrangement is crafted with care and backed by our satisfaction guarantee"
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Same Day Delivery",
      description: "Order by 1pm for same-day delivery in most areas"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Fresh & On Time",
      description: "We ensure your flowers arrive fresh and exactly when you need them"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Local Artisans",
      description: "Support talented local florists in your community"
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <img 
                src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                alt="Local florist creating an arrangement"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Support Local Artisan Florists</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Every arrangement is crafted with care by passionate local florists in your area. 
                Get fresh, beautiful flowers delivered right to your door or pick up from the shop, 
                all while supporting small businesses in your community.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/search')}
                className="text-lg"
              >
                Find Your Local Florist
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};