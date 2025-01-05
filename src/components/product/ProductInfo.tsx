import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
}

export const ProductInfo = ({ title, price, floristName }: ProductInfoProps) => {
  const { toast } = useToast();

  // Split only on the first hyphen to preserve any other hyphens in the size description
  const [mainTitle, ...sizeParts] = title.split(' - ');
  const size = sizeParts.join(' - '); // Rejoin any remaining parts with hyphens

  return (
    <div className="space-y-4">
      {/* Title Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-[18px] font-semibold leading-tight">
            {mainTitle}
          </h3>
          {floristName && (
            <p className="text-[12px] text-muted-foreground">
              By {floristName}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            toast({
              title: "Added to wishlist",
              description: "Item has been added to your wishlist",
            });
          }}
        >
          <Heart className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Size and Price Section */}
      <div className="space-y-1.5">
        {size && (
          <div className="space-y-1">
            <p className="text-[12px] text-muted-foreground">
              Size:
            </p>
            <p className="text-[14px] text-foreground font-medium">
              {size}
            </p>
          </div>
        )}
        <p className="text-[14px] font-medium">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};