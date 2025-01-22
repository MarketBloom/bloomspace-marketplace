import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles!inner(store_name)
        `)
        .eq('is_hidden', false)
        .limit(6);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load featured products",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <ErrorBoundary>
        <Categories navigate={navigate} />
      </ErrorBoundary>

      <ErrorBoundary>
        <FeaturedProducts 
          products={products || []} 
          isLoading={isLoading} 
          navigate={navigate} 
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <HowItWorks />
      </ErrorBoundary>

      <ErrorBoundary>
        <TrustSection navigate={navigate} />
      </ErrorBoundary>

      <ErrorBoundary>
        <Testimonials />
      </ErrorBoundary>
    </div>
  );
};

export default Index;