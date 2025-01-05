import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
  isSelected?: boolean;
  onSelect?: (id: string, sizeId: string | null) => void;
  selectionMode?: boolean;
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
  sizeId,
  isSelected = false,
  onSelect,
  selectionMode = false
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (selectionMode && onSelect) {
      onSelect(id, sizeId);
    } else {
      navigate(`/product/${id}`);
    }
  };

  const displayTitle = displaySize ? `${title} - ${displaySize}` : title;

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer bg-white hover:shadow-lg border-0"
      onClick={handleCardClick}
    >
      {selectionMode && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox 
            checked={isSelected}
            className="bg-white/90"
            onCheckedChange={() => onSelect?.(id, sizeId)}
          />
        </div>
      )}
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