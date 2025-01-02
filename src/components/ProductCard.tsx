import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, MapPin } from "lucide-react";
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
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
      onClick={() => navigate(`/product/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          <div className="absolute top-4 right-4 space-y-2">
            <Button
              variant="secondary"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Added to wishlist",
                  description: "Item has been added to your wishlist",
                });
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium tracking-tight leading-none">{title}</h3>
          <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
          {floristName && (
            <div className="flex items-start space-x-1.5 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{floristName}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline"
          size="sm"
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};