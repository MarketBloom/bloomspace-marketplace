import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 animate-float">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Fresh Local Flowers
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Support local florists and discover unique arrangements
              </p>
              
              <div className="max-w-4xl mx-auto">
                <FilterBar />
              </div>
              
              <Button 
                className="mt-8 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={() => navigate('/search')}
              >
                Find Flowers
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Arrangements</h2>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </main>
    </div>
  );
};

export default Index;