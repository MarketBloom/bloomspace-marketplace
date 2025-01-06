import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Birthday",
    description: "Perfect for celebrations",
    image: "/lovable-uploads/639fac67-e61e-41dc-b3c1-562fe547aef1.png"
  },
  {
    name: "Romance",
    description: "Express your love",
    image: "/lovable-uploads/683185ef-5451-4967-beef-fec3a2908a4f.png"
  },
  {
    name: "Premium",
    description: "Luxury arrangements",
    image: "/lovable-uploads/e1b1a25b-94d5-4eb5-a0d8-0a4d4a18d4a1.png"
  },
  {
    name: "Seasonal",
    description: "Fresh picks",
    image: "/lovable-uploads/731739bb-c331-43ed-948f-bdfcbc18e356.png"
  }
];

interface CategoriesProps {
  navigate: (path: string) => void;
}

export const Categories = ({ navigate }: CategoriesProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diagonal scroll effect for category cards
      const cards = gsap.utils.toArray<HTMLElement>('.category-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0,
            x: -50,
            y: 50
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
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
    <section 
      ref={sectionRef}
      className="py-12 bg-isabelline"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Shop by Category</h2>
            <p className="text-lg text-black/60">Explore our curated collection of floral categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="category-card group cursor-pointer"
                onClick={() => navigate(`/search?category=${category.name.toLowerCase()}`)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-apple">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/90">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};