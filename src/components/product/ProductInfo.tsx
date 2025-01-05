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
    <div className="space-y-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-bold leading-tight tracking-tight">
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
      {floristName && (
        <p className="text-sm text-muted-foreground -mt-1">
          By {floristName}
        </p>
      )}
      <div className="flex items-baseline gap-2">
        <p className="text-lg font-bold text-primary">
          ${price.toFixed(2)}
        </p>
        <span className="text-sm font-medium text-muted-foreground">
          Standard
        </span>
      </div>
    </div>
  );
};