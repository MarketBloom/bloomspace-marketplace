import { Header } from "@/components/Header";
import { MobileHero } from "@/components/MobileHero";
import { MobileHowItWorks } from "@/components/MobileHowItWorks";
import { MobileCategories } from "@/components/mobile/MobileCategories";
import { MobileFeaturedProducts } from "@/components/mobile/MobileFeaturedProducts";
import { MobileTrustSection } from "@/components/mobile/MobileTrustSection";
import { MobileTestimonials } from "@/components/mobile/MobileTestimonials";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";

const MobileIndex = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <PixelTrail
          pixelSize={48}
          fadeDuration={500}
          delay={0}
          className="absolute inset-0 pointer-events-none"
          pixelClassName="rounded-full bg-primary opacity-30"
        />
        <div className="relative">
          <Header />
          <MobileHero />
          <MobileHowItWorks />
          <MobileCategories />
          <MobileFeaturedProducts 
            products={products || []} 
            isLoading={isLoading} 
          />
          <MobileTrustSection />
          <MobileTestimonials />
        </div>
      </div>
    </div>
  );
};

export default MobileIndex;