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
        className="group relative overflow-hidden cursor-pointer bg-white border-0 
                   transition-all duration-500 h-full rounded-xl md:shadow-apple md:hover:shadow-apple-hover"
        onClick={handleClick}
        role="link"
        tabIndex={0}
      >
        <div className="flex flex-col h-full">
          <div className="relative h-[70%] overflow-hidden bg-secondary">
            <ProductImage src={images?.[0]} alt={displayTitle} />
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              {isDeliveryAvailable && (
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-2 py-1">
                  <Truck className="w-3 h-3" />
                  {deliveryCutoff ? `Until ${deliveryCutoff}` : 'Available'}
                </Badge>
              )}
              {isPickupAvailable && (
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] flex items-center gap-1 font-medium whitespace-nowrap px-2 py-1">
                  <ShoppingBag className="w-3 h-3" />
                  {pickupCutoff ? `Until ${pickupCutoff}` : 'Available'}
                </Badge>
              )}
            </div>
          </div>
          <div className="p-2 h-[30%] md:hidden">
            <ProductInfo 
              title={displayTitle} 
              price={displayPrice}
              floristName={floristName} 
              displaySize={displaySize}
            />
          </div>
          <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent p-4">
            <ProductInfo 
              title={displayTitle} 
              price={displayPrice}
              floristName={floristName} 
              displaySize={displaySize}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};