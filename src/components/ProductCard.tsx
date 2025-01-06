import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const displayTitle = displaySize ? `${title}` : title;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = sizeId ? `/product/${id}?size=${sizeId}` : `/product/${id}`;
    navigate(url);
  };

  return (
    <div className="aspect-[4/5] w-full">
      <Card 
        className="group relative overflow-hidden cursor-pointer bg-white border-0 shadow-apple hover:shadow-apple-hover active:shadow-apple-hover transition-all duration-300 h-full rounded-lg md:rounded-xl touch-manipulation"
        onClick={handleClick}
        role="link"
        tabIndex={0}
      >
        <div className="h-[65%] relative">
          <ProductImage src={images?.[0]} alt={displayTitle} />
          <div className="absolute top-0.5 right-0.5 md:top-3 md:right-3 flex flex-col gap-1">
            {isDeliveryAvailable && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[8px] md:text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-1 py-0.5">
                <Truck className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {deliveryCutoff ? `Until ${deliveryCutoff}` : 'Available'}
              </Badge>
            )}
            {isPickupAvailable && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[8px] md:text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-1 py-0.5">
                <ShoppingBag className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {pickupCutoff ? `Until ${pickupCutoff}` : 'Available'}
              </Badge>
            )}
          </div>
        </div>
        <div className="h-[35%] px-1 py-1 md:px-4 md:py-3">
          <ProductInfo 
            title={displayTitle} 
            price={displayPrice}
            floristName={floristName} 
            displaySize={displaySize}
          />
        </div>
      </Card>
    </div>
  );
};