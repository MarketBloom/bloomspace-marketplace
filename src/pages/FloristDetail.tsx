import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

const FloristDetail = () => {
  const { id } = useParams();

  const { data: florist, isLoading: isLoadingFlorist } = useQuery({
    queryKey: ['florist', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('florist_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['florist-products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('florist_id', id)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingFlorist || isLoadingProducts) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!florist) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Florist not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{florist.store_name}</h1>
            <p className="text-muted-foreground">{florist.address}</p>
            {florist.about_text && (
              <p className="mt-4 text-muted-foreground">{florist.about_text}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                images={product.images}
                floristName={florist.store_name}
                floristId={florist.id}
              />
            ))}
          </div>

          {products?.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No products available</h2>
              <p className="text-muted-foreground">
                This florist hasn't added any products yet
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FloristDetail;