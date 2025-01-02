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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-medium text-center mb-2 tracking-tight font-mono">Shop by Category</h2>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-xl mx-auto font-mono">
          Find fresh, local arrangements for every occasion
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden cursor-pointer rounded-lg"
              onClick={() => navigate(`/search?category=${category.name.toLowerCase()}`)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="mb-1.5 text-white">{category.icon}</div>
                <h3 className="text-sm font-medium mb-0.5 text-white tracking-tight font-mono">{category.name}</h3>
                <p className="text-xs text-gray-200 font-mono">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};