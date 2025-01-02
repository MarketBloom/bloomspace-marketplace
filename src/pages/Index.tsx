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
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Romance",
      icon: <Heart className="h-6 w-6" />,
      description: "Express your love",
      gradient: "from-red-500 to-pink-500"
    },
    {
      name: "Premium",
      icon: <Star className="h-6 w-6" />,
      description: "Luxury arrangements",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      name: "Seasonal",
      icon: <Flower2 className="h-6 w-6" />,
      description: "Fresh picks",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 animate-float">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Fresh Local Flowers
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Support local florists and discover unique arrangements
              </p>
              
              <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/90 rounded-lg p-6">
                <FilterBar />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className={`h-auto p-6 bg-gradient-to-r ${category.gradient} hover:opacity-90 transition-opacity`}
                  onClick={() => navigate(`/search?category=${category.name.toLowerCase()}`)}
                >
                  <div className="text-white text-center">
                    <div className="mb-4">{category.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Featured Arrangements</h2>
            <p className="text-gray-600 text-center mb-12">Handpicked selections from our local florists</p>
            
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
            
            <div className="text-center mt-12">
              <Button 
                size="lg"
                onClick={() => navigate('/search')}
                className="bg-primary hover:bg-primary/90"
              >
                View All Arrangements
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;