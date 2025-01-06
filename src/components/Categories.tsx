import { Flower2, Gift, Heart, Star } from "lucide-react";

const categories = [
  {
    name: "Birthday",
    icon: <Gift className="h-4 w-4" />,
    description: "Perfect for celebrations",
    image: "/lovable-uploads/639fac67-e61e-41dc-b3c1-562fe547aef1.png"
  },
  {
    name: "Romance",
    icon: <Heart className="h-4 w-4" />,
    description: "Express your love",
    image: "/lovable-uploads/683185ef-5451-4967-beef-fec3a2908a4f.png"
  },
  {
    name: "Premium",
    icon: <Star className="h-4 w-4" />,
    description: "Luxury arrangements",
    image: "/lovable-uploads/e1b1a25b-94d5-4eb5-a0d8-0a4d4a18d4a1.png"
  },
  {
    name: "Seasonal",
    icon: <Flower2 className="h-4 w-4" />,
    description: "Fresh picks",
    image: "/lovable-uploads/731739bb-c331-43ed-948f-bdfcbc18e356.png"
  }
];

export const Categories = ({ navigate }: { navigate: (path: string) => void }) => {
  return (
    <section className="py-8 bg-[#000000]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-white mb-2">Shop by Category</h2>
        <p className="text-base text-white/80 mb-6">
          Find fresh, local arrangements for every occasion
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden cursor-pointer rounded-2xl bg-[#1A1F2C] hover:bg-[#2A2F3C] transition-all duration-300 shadow-lg"
              onClick={() => navigate(`/search?category=${category.name.toLowerCase()}`)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 text-white/90">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-white">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};