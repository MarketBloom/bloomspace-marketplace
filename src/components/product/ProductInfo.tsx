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
    <div className="space-y-4">
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold leading-tight">
            {title}
          </h3>
          {floristName && (
            <p className="text-sm font-medium text-muted-foreground">
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

      <div className="flex items-baseline gap-3">
        <p className="text-3xl font-bold text-foreground">
          ${price.toFixed(2)}
        </p>
        <span className="text-base font-medium text-muted-foreground">
          Standard
        </span>
      </div>
    </div>
  );
};