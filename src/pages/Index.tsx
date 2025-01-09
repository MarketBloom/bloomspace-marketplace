import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import MobileIndex from "./MobileIndex";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();
  
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

  if (isMobile) {
    return <MobileIndex />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 80}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-primary/10"
        />
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <HowItWorks />
        <Categories navigate={navigate} />
        <FeaturedProducts 
          products={products || []} 
          isLoading={isLoading} 
          navigate={navigate}
        />
        <TrustSection navigate={navigate} />
        <Testimonials />
      </div>
    </div>
  );
};

export default Index;