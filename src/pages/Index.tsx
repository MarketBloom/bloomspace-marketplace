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
import MobileIndex from "./MobileIndex";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/components/hooks/use-screen-size";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        console.log('Fetching featured products...');
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

        if (!data) {
          throw new Error('No data returned from Supabase');
        }

        console.log('Products fetched:', data);
        return data;
      } catch (err) {
        console.error('Query error:', err);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast.error("Failed to load featured products. Please try again later.");
      }
    }
  });

  if (isMobile) {
    return <MobileIndex />;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 pointer-events-none z-20">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 80}
          fadeDuration={200}
          delay={0}
          pixelClassName="rounded-full bg-[#FFD700] opacity-70"
        />
      </div>
      <div className="relative z-30">
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