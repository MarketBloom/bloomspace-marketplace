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
      
      {/* Value Proposition Section */}
      <section className="py-4 bg-white">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Local Shopping */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Shop Local, Support Local
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect directly with talented florists in your neighborhood
              </p>
            </div>
            
            {/* Wide Selection */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                100+ Local Florists
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover unique arrangements from the best florists in your area
              </p>
            </div>
            
            {/* Same Day Delivery */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Same-Day Delivery
              </h2>
              <p className="text-lg text-muted-foreground">
                Filter by delivery time to find florists available for last-minute orders
              </p>
            </div>
          </div>
        </div>
      </section>

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