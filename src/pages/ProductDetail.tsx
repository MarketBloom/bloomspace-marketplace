import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductHeader } from "@/components/product-detail/ProductHeader";
import { ProductImages } from "@/components/product-detail/ProductImages";
import { ProductPrice } from "@/components/product-detail/ProductPrice";
import { ProductDescription } from "@/components/product-detail/ProductDescription";
import { ProductSizeSelector } from "@/components/product-detail/ProductSizeSelector";
import { ProductActions } from "@/components/product-detail/ProductActions";
import { FloristInfo } from "@/components/product-detail/FloristInfo";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSizeId = searchParams.get('size');
  const { addToCart } = useCart();

  // Fetch product details including florist profile
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles!inner (
            id,
            store_name,
            street_address,
            suburb,
            state,
            postcode,
            about_text
          ),
          product_sizes (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (product) {
      const selectedSize = product.product_sizes?.find(size => size.id === selectedSizeId);
      const cartItem = {
        productId: product.id,
        title: product.title,
        price: selectedSize ? product.price + selectedSize.price_adjustment : product.price,
        sizeId: selectedSize?.id,
        sizeName: selectedSize?.name,
        image: selectedSize?.images?.[0] || product.images?.[0],
        floristId: product.florist_id,
        floristName: product.florist_profiles.store_name
      };
      addToCart(cartItem);
    }
  };

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductHeader onBack={handleBack} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ProductImages 
              images={product.images || []} 
              title={product.title} 
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            
            <ProductPrice price={product.price} />
            
            {product.description && (
              <ProductDescription description={product.description} />
            )}
            
            {product.product_sizes && product.product_sizes.length > 0 && (
              <ProductSizeSelector
                sizes={product.product_sizes}
                selectedSizeId={selectedSizeId}
                basePrice={product.price}
                onSizeChange={(sizeId) => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set('size', sizeId);
                  navigate(`/product/${id}?${newParams.toString()}`);
                }}
              />
            )}
            
            <ProductActions 
              onAddToCart={handleAddToCart}
              productTitle={product.title}
            />

            {product.florist_profiles && (
              <FloristInfo floristProfile={product.florist_profiles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;