import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface ProductSize {
  id: string;
  name: string;
  price_adjustment: number;
  is_default: boolean;
}

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  floristName?: string;
  floristId: string;
  isDeliveryAvailable?: boolean;
  isPickupAvailable?: boolean;
  deliveryCutoff?: string;
  pickupCutoff?: string;
}

export const ProductCard = ({ 
  id, 
  title, 
  price, 
  images, 
  floristName,
  floristId,
  isDeliveryAvailable = true,
  isPickupAvailable = true,
  deliveryCutoff,
  pickupCutoff
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { data: sizes } = useQuery({
    queryKey: ['product-sizes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_sizes')
        .select('*')
        .eq('product_id', id)
        .order('price_adjustment', { ascending: true });

      if (error) throw error;
      return data as ProductSize[];
    },
  });

  // Find the default size or the first size if no default is set
  const defaultSize = sizes?.find(size => size.is_default) || sizes?.[0];
  
  // Set the selected size to the default size when sizes are loaded
  if (sizes?.length && !selectedSize && defaultSize) {
    setSelectedSize(defaultSize.id);
  }

  const selectedSizeData = sizes?.find(size => size.id === selectedSize);
  const adjustedPrice = selectedSizeData 
    ? price + selectedSizeData.price_adjustment 
    : price;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the size selector
    if ((e.target as HTMLElement).closest('.size-selector')) {
      e.stopPropagation();
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer bg-white hover:shadow-lg border-0"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <ProductImage src={images?.[0]} alt={title} />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isDeliveryAvailable && (
            <Badge variant="secondary" className="bg-white/90 text-[10px] flex items-center gap-1">
              <Truck className="w-3 h-3" />
              {deliveryCutoff ? `Until ${deliveryCutoff}` : 'Available'}
            </Badge>
          )}
          {isPickupAvailable && (
            <Badge variant="secondary" className="bg-white/90 text-[10px] flex items-center gap-1">
              <ShoppingBag className="w-3 h-3" />
              {pickupCutoff ? `Until ${pickupCutoff}` : 'Available'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <ProductInfo 
          title={title} 
          price={adjustedPrice}
          floristName={floristName} 
        />
        {sizes && sizes.length > 0 && (
          <div className="size-selector mt-2">
            <Select
              value={selectedSize || undefined}
              onValueChange={setSelectedSize}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.id} value={size.id} className="text-xs">
                    {size.name} {size.price_adjustment > 0 ? `(+$${size.price_adjustment})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <AddToCartButton
          id={id}
          title={title}
          price={adjustedPrice}
          image={images?.[0]}
          floristId={floristId}
          floristName={floristName}
          selectedSizeId={selectedSize}
          selectedSizeName={selectedSizeData?.name}
        />
      </CardFooter>
    </Card>
  );
};