import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  floristName?: string;
  floristId: string;
}

export const ProductCard = ({ 
  id, 
  title, 
  price, 
  description, 
  images, 
  floristName,
  floristId 
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id,
      title,
      price,
      image: images?.[0],
      floristId,
      floristName
    });
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer bg-white hover:shadow-lg border-0"
      onClick={() => navigate(`/product/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1">
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
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button 
          variant="outline"
          size="sm"
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs h-8 font-mono"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};