import { Card } from "@/components/ui/card";
import { ProductImage } from "./product/ProductImage";
import { ProductInfo } from "./product/ProductInfo";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlareCard } from "@/components/ui/glare-card";

interface ProductCardProps {
  id: string;
  images?: string[];
  title: string;
  price: number;
  floristName?: string;
  floristId?: string;  // Added this
  description?: string;  // Added this
  displaySize?: string | null;
  displayTitle?: string;
  displayPrice?: number;
  sizeId?: string | null;
  isDeliveryAvailable?: boolean;
  isPickupAvailable?: boolean;
  deliveryCutoff?: string;
  pickupCutoff?: string;
}

export const ProductCard = ({ 
  id,
  images,
  title,
  price,
  floristName,
  floristId,  // Added this
  description,  // Added this
  displaySize,
  displayTitle = title,
  displayPrice = price,
  sizeId,
  isDeliveryAvailable,
  isPickupAvailable,
  deliveryCutoff,
  pickupCutoff
}: ProductCardProps) => {
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    const url = new URL(`/product/${id}`, window.location.origin);
    if (sizeId) {
      url.searchParams.set('size', sizeId);
    }
    window.location.href = url.toString();
  };

  return (
    <div className="aspect-[4/5] w-full">
      <GlareCard className="!w-full !h-full !min-w-0 !min-h-0 !aspect-auto">
        <Card 
          className="group relative overflow-hidden cursor-pointer bg-white border border-black shadow-apple hover:shadow-apple-hover active:shadow-apple-hover transition-all duration-300 h-full rounded-lg md:rounded-xl touch-manipulation"
          onClick={handleClick}
          role="link"
          tabIndex={0}
        >
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
        </Card>
      </GlareCard>
    </div>
  );
};