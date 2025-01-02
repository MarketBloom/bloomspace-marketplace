import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories navigate={navigate} />
        <FeaturedProducts 
          products={featuredProducts} 
          isLoading={isLoading} 
          navigate={navigate} 
        />
        <TrustSection navigate={navigate} />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;