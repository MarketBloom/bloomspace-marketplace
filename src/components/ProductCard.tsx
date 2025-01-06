import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  displaySize?: string | null;
  displayPrice: number;
  sizeId?: string | null;
}

export const ProductCard = ({ 
  id, 
  title, 
  images, 
  floristName,
  floristId,
  isDeliveryAvailable = true,
  isPickupAvailable = true,
  deliveryCutoff,
  pickupCutoff,
  displaySize,
  displayPrice,
  sizeId
}: ProductCardProps) => {
  const navigate = useNavigate();
  const displayTitle = displaySize ? `${title} - ${displaySize}` : title;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = sizeId ? `/product/${id}?size=${sizeId}` : `/product/${id}`;
    navigate(url);
  };

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer bg-white shadow-apple hover:shadow-apple-hover transition-shadow duration-300 border-0"
      onClick={handleClick}
      role="link"
      tabIndex={0}
    >
      <CardHeader className="p-0">
        <ProductImage src={images?.[0]} alt={displayTitle} />
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
          title={displayTitle} 
          price={displayPrice}
          floristName={floristName} 
        />
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <AddToCartButton
          id={id}
          title={displayTitle}
          price={displayPrice}
          image={images?.[0]}
          floristId={floristId}
          floristName={floristName}
          selectedSizeId={sizeId}
          selectedSizeName={displaySize || undefined}
        />
      </CardFooter>
    </Card>
  );
};