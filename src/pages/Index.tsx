import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  
  const { data: products, isLoading, error } = useQuery({
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return data;
    },
    retry: 1,
    retryDelay: 1000,
    meta: {
      onError: () => {
        console.error('Query error:', error);
        toast.error("Failed to load featured products. Please try again later.");
      }
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories navigate={navigate} />
      <FeaturedProducts 
        products={products || []} 
        isLoading={isLoading} 
        navigate={navigate}
      />
      <TrustSection navigate={navigate} />
      <Testimonials />
    </div>
  );
};

export default Index;