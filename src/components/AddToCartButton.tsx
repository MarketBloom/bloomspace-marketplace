import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  floristId: string;
  floristName?: string;
}

export const AddToCartButton = ({ 
  id, 
  title, 
  price, 
  image, 
  floristId, 
  floristName 
}: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id,
      title,
      price,
      image,
      floristId,
      floristName
    });
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  return (
    <Button 
      variant="default"
      size="sm"
      className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-3.5 w-3.5 mr-2" />
      Add to Cart
    </Button>
  );
};