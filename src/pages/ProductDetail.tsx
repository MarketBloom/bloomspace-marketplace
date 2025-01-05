import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    // TODO: Implement cart functionality
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

  // Find the selected size or default to the first size or null
  const selectedSize = productData.product_sizes?.find(size => size.id === selectedSizeId) 
    || productData.product_sizes?.[0] 
    || null;

  // Calculate the display price based on the selected size
  const displayPrice = selectedSize 
    ? productData.price + selectedSize.price_adjustment 
    : productData.price;

  // Use size-specific images if available, otherwise use product images
  const displayImages = selectedSize?.images?.length 
    ? selectedSize.images 
    : productData.images;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={displayImages?.[0] || "/placeholder.svg"}
                alt={productData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {displayImages?.slice(1).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg border">
                  <img
                    src={image}
                    alt={`${productData.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{productData.title}</h1>
              <p className="text-2xl font-semibold text-primary">${displayPrice.toFixed(2)}</p>
            </div>
            
            {productData.product_sizes && productData.product_sizes.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-semibold">Select Size</h2>
                <RadioGroup 
                  defaultValue={selectedSize?.id} 
                  className="grid gap-4"
                >
                  {productData.product_sizes.map((size) => (
                    <div key={size.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={size.id} id={size.id} />
                      <Label htmlFor={size.id} className="flex-1">
                        <div className="flex justify-between">
                          <span>{size.name}</span>
                          <span className="font-semibold">
                            ${(productData.price + size.price_adjustment).toFixed(2)}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <div className="space-y-2">
              <h2 className="font-semibold">Description</h2>
              <p className="text-gray-600">{productData.description}</p>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-semibold">Florist</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{productData.florist_profiles?.store_name}</p>
                <p className="text-sm text-gray-600">{productData.florist_profiles?.address}</p>
                {productData.florist_profiles?.about_text && (
                  <p className="text-sm text-gray-600 mt-2">{productData.florist_profiles.about_text}</p>
                )}
              </div>
            </div>
            
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