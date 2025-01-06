import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
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
      className="group relative overflow-hidden cursor-pointer bg-white border-0 shadow-apple hover:shadow-apple-hover transition-all duration-300 h-full flex flex-col"
      onClick={handleClick}
      role="link"
      tabIndex={0}
    >
      <CardHeader className="p-0 flex-shrink-0">
        <div className="relative">
          <ProductImage src={images?.[0]} alt={displayTitle} />
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {isDeliveryAvailable && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] flex items-center gap-1 font-medium">
                <Truck className="w-3 h-3" />
                {deliveryCutoff ? `Until ${deliveryCutoff}` : 'Available'}
              </Badge>
            )}
            {isPickupAvailable && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] flex items-center gap-1 font-medium">
                <ShoppingBag className="w-3 h-3" />
                {pickupCutoff ? `Until ${pickupCutoff}` : 'Available'}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-end">
        <ProductInfo 
          title={displayTitle} 
          price={displayPrice}
          floristName={floristName} 
          displaySize={displaySize}
        />
      </CardContent>
    </Card>
  );
};