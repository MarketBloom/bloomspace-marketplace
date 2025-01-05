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

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="flex justify-between items-start">
        <h3 className="text-[40px] font-semibold leading-tight tracking-tight">
          {title}
        </h3>
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

      {/* Price and Details Section */}
      <div className="space-y-4">
        <div className="flex items-baseline">
          <span className="text-[20px] font-medium">From</span>
          <p className="text-[40px] font-semibold ml-2">
            ${price.toFixed(2)}
          </p>
        </div>

        {floristName && (
          <p className="text-[20px] font-medium text-muted-foreground">
            By {floristName}
          </p>
        )}

        <p className="text-[20px] font-medium text-muted-foreground">
          Standard Size
        </p>
      </div>
    </div>
  );
};