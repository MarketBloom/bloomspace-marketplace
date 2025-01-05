import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductActionsProps {
  onAddToCart: () => void;
}

export const ProductActions = ({ onAddToCart }: ProductActionsProps) => {
  return (
    <div className="pt-4">
      <Button 
        size="lg" 
        className="w-full"
        onClick={onAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
};