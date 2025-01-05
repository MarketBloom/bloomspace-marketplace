import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Loader2, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          *,
          product_sizes (
            id,
            name,
            price_adjustment,
            images
          )
        `)
        .eq('florist_id', id)
        .eq('in_stock', true)
        .eq('is_hidden', false);

      if (error) throw error;

      // Transform products to include variants
      const productsWithVariants = productsData?.flatMap(product => {
        // If no sizes, return product with base price
        if (!product.product_sizes || product.product_sizes.length === 0) {
          return [{
            ...product,
            displaySize: null,
            displayPrice: product.price,
            sizeId: null
          }];
        }

        // Create entries for each size variant
        return product.product_sizes.map(size => ({
          ...product,
          displaySize: size.name,
          displayPrice: product.price + (size.price_adjustment || 0),
          sizeId: size.id,
          images: size.images?.length ? size.images : product.images
        }));
      });

      return productsWithVariants || [];
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
      
      {/* Hero Section with Banner */}
      <div className="w-full h-64 relative bg-muted">
        {florist.banner_url ? (
          <img 
            src={florist.banner_url} 
            alt={`${florist.store_name} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10" />
        )}
      </div>

      <main className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Store Info Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden border bg-white">
                  {florist.logo_url ? (
                    <img 
                      src={florist.logo_url} 
                      alt={`${florist.store_name} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {florist.store_name[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Store Details */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-2">{florist.store_name}</h1>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{florist.address}</span>
                  </div>
                  {florist.operating_hours && (
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Open: {florist.operating_hours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {florist.about_text && (
              <>
                <Separator className="my-6" />
                <p className="text-muted-foreground">{florist.about_text}</p>
              </>
            )}
          </div>

          {/* Products Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Products</h2>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={`${product.id}-${product.sizeId || 'default'}`}
                    {...product}
                    floristName={florist.store_name}
                    floristId={florist.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">No products available</h2>
                <p className="text-muted-foreground">
                  This florist hasn't added any products yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FloristDetail;