import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2, Flower2, Gift, Heart, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false)
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  const categories = [
    {
      name: "Birthday",
      icon: <Gift className="h-6 w-6" />,
      description: "Perfect for celebrations",
      image: "/lovable-uploads/639fac67-e61e-41dc-b3c1-562fe547aef1.png"
    },
    {
      name: "Romance",
      icon: <Heart className="h-6 w-6" />,
      description: "Express your love",
      image: "/lovable-uploads/683185ef-5451-4967-beef-fec3a2908a4f.png"
    },
    {
      name: "Premium",
      icon: <Star className="h-6 w-6" />,
      description: "Luxury arrangements",
      image: "/lovable-uploads/e1b1a25b-94d5-4eb5-a0d8-0a4d4a18d4a1.png"
    },
    {
      name: "Seasonal",
      icon: <Flower2 className="h-6 w-6" />,
      description: "Fresh picks",
      image: "/lovable-uploads/17a727e6-79a4-4a37-881d-6132a46827ee.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section with updated messaging and design */}
        <section className="relative h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/2e9cbcc7-b4e1-4fdb-bb65-b58f0afd8976.png" 
              alt="Fresh flowers from local florists"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                Market Bloom
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-4">
                Same-Day or Any-Day Flowers, Delivered or Picked Up
              </p>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Support local florists and get the perfect arrangement for any occasion, 
                delivered or picked up on your schedule.
              </p>
              
              <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-lg">
                <FilterBar />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section with updated imagery */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Find fresh, local arrangements for every occasion, at any price point
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
                  onClick={() => navigate(`/search?category=${category.name.toLowerCase()}`)}
                >
                  <div className="aspect-[4/5]">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-3">{category.icon}</div>
                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Section with local focus */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Featured Arrangements</h2>
                <p className="text-gray-600 text-lg">Fresh picks from local artisan florists</p>
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/search')}
              >
                View All
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts?.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    images={product.images}
                    floristName={product.florist_profiles?.store_name}
                    floristId={product.florist_id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Section highlighting local focus */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                    alt="Local florist creating an arrangement"
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Support Local Artisan Florists</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Every arrangement is crafted with care by passionate local florists in your area. 
                    Get fresh, beautiful flowers delivered right to your door or pick up from the shop, 
                    all while supporting small businesses in your community.
                  </p>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/search')}
                  >
                    Find Your Local Florist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;