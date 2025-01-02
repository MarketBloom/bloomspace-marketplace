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
    <div className="space-y-1">
      <div className="flex justify-between items-start">
        <h3 className="text-xs font-medium tracking-tight leading-none font-mono">{title}</h3>
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
      <p className="text-xs text-muted-foreground font-mono">${price.toFixed(2)}</p>
      {floristName && (
        <p className="text-[10px] text-muted-foreground font-mono truncate">
          {floristName}
        </p>
      )}
    </div>
  );
};