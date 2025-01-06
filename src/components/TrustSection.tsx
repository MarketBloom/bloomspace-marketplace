import { Button } from "@/components/ui/button";
import { Shield, Truck, Clock, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = ({ navigate }: { navigate: (path: string) => void }) => {
  const features = [
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "100% Satisfaction",
      description: "Every arrangement is crafted with care and backed by our satisfaction guarantee"
    },
    {
      icon: <Truck className="h-5 w-5 text-primary" />,
      title: "Same Day Delivery",
      description: "Order by 1pm for same-day delivery in most areas"
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Fresh & On Time",
      description: "We ensure your flowers arrive fresh and exactly when you need them"
    },
    {
      icon: <Heart className="h-5 w-5 text-primary" />,
      title: "Local Artisans",
      description: "Support talented local florists in your community"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the image and content separately
      gsap.fromTo(".trust-image",
        { 
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".trust-image",
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(".trust-content",
        { 
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".trust-content",
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate feature cards
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              end: "top center",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-[#F5F5F7]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="trust-image">
              <img 
                src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                alt="Local florist creating an arrangement"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="trust-content space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Support Local Artisan Florists</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card p-6 rounded-2xl bg-white hover:shadow-sm transition-shadow"
                data-speed={1 + Math.random() * 0.5}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};