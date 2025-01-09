import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlareCard } from "@/components/ui/glare-card";

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

  const cardContent = (
    <>
      <div className="h-[70%] md:h-[80%] relative">
        <ProductImage src={images?.[0]} alt={displayTitle} />
        <div className="absolute top-0.5 right-0.5 md:top-3 md:right-3 flex flex-col gap-1">
          {isDeliveryAvailable && (
            <Badge variant="secondary" className="bg-white text-[10px] md:text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-1.5 py-0.5">
              <Truck className="w-3 h-3 md:w-3 md:h-3" />
              {deliveryCutoff ? `Until ${deliveryCutoff}` : 'Available'}
            </Badge>
          )}
          {isPickupAvailable && (
            <Badge variant="secondary" className="bg-white text-[10px] md:text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-1.5 py-0.5">
              <ShoppingBag className="w-3 h-3 md:w-3 md:h-3" />
              {pickupCutoff ? `Until ${pickupCutoff}` : 'Available'}
            </Badge>
          )}
        </div>
      </div>
      <div className="h-[30%] md:h-[20%] px-1.5 py-1.5 md:px-3 lg:px-3 xl:px-4 md:py-2">
        <ProductInfo 
          title={displayTitle} 
          price={displayPrice}
          floristName={floristName} 
          displaySize={displaySize}
        />
      </div>
    </>
  );

  return (
    <div className="aspect-[4/5] w-full">
      <GlareCard className="!w-full !aspect-[4/5] cursor-pointer bg-white">
        <div 
          className="h-full"
          onClick={handleClick}
          role="link"
          tabIndex={0}
        >
          {cardContent}
        </div>
      </GlareCard>
    </div>
  );
};