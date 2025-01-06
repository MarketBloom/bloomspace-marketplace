import { Button } from "@/components/ui/button";
import { Shield, Truck, Clock, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = ({ navigate }: { navigate: (path: string) => void }) => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-selective_yellow" />,
      title: "100% Satisfaction",
      description: "Every arrangement is crafted with care and backed by our satisfaction guarantee"
    },
    {
      icon: <Truck className="h-6 w-6 text-selective_yellow" />,
      title: "Same Day Delivery",
      description: "Order by 1pm for same-day delivery in most areas"
    },
    {
      icon: <Clock className="h-6 w-6 text-selective_yellow" />,
      title: "Fresh & On Time",
      description: "We ensure your flowers arrive fresh and exactly when you need them"
    },
    {
      icon: <Heart className="h-6 w-6 text-selective_yellow" />,
      title: "Local Artisans",
      description: "Support talented local florists in your community"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the image
      gsap.fromTo(".trust-image",
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".trust-image",
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate the content
      gsap.fromTo(".trust-content",
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
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
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="trust-image relative">
              <img 
                src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                alt="Local florist creating an arrangement"
                className="rounded-2xl shadow-apple"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-selective_yellow/10 to-transparent rounded-2xl" />
            </div>
            <div className="trust-content space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                Support Local Artisan Florists
              </h2>
              <p className="text-lg md:text-xl text-black/60 leading-relaxed">
                Every arrangement is crafted with care by passionate local florists in your area. 
                Get fresh, beautiful flowers delivered right to your door or pick up from the shop, 
                all while supporting small businesses in your community.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/search')}
                className="text-base bg-selective_yellow hover:bg-selective_yellow/90 text-black"
              >
                Find Your Local Florist
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card p-8 rounded-2xl bg-isabelline/30 hover:shadow-apple transition-all duration-500"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-base text-black/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
