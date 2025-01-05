import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProductImages } from "@/components/product-detail/ProductImages";
import { ProductSizeSelector } from "@/components/product-detail/ProductSizeSelector";
import { FloristInfo } from "@/components/product-detail/FloristInfo";

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSizeId = searchParams.get('size');
  const { toast } = useToast();

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name,
            address,
            about_text
          ),
          product_sizes (
            id,
            name,
            price_adjustment,
            images
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </div>
    );
  }

  const selectedSize = productData.product_sizes?.find(size => size.id === selectedSizeId) 
    || productData.product_sizes?.[0] 
    || null;

  const displayPrice = selectedSize 
    ? productData.price + selectedSize.price_adjustment 
    : productData.price;

  const displayImages = selectedSize?.images?.length 
    ? selectedSize.images 
    : productData.images;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImages images={displayImages} title={productData.title} />
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{productData.title}</h1>
              <p className="text-2xl font-semibold text-primary">
                ${displayPrice.toFixed(2)}
              </p>
            </div>
            
            <ProductSizeSelector 
              sizes={productData.product_sizes || []}
              selectedSizeId={selectedSize?.id || null}
              basePrice={productData.price}
              onSizeChange={(sizeId) => {
                // Update URL with selected size
                const newParams = new URLSearchParams(searchParams);
                newParams.set('size', sizeId);
                window.history.replaceState({}, '', `?${newParams.toString()}`);
              }}
            />
            
            <div className="space-y-2">
              <h2 className="font-semibold">Description</h2>
              <p className="text-gray-600">{productData.description}</p>
            </div>
            
            <FloristInfo floristProfile={productData.florist_profiles} />
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;