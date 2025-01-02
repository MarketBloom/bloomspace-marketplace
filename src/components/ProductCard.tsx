import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

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
  };

  return (
    <Card 
      className="group border-0 shadow-none cursor-pointer transition-all duration-500"
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardHeader className="p-0">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-6">
        <h3 className="font-light text-xl mb-2 tracking-wide">{title}</h3>
        <p className="text-gray-900 mb-2 font-light">${price.toFixed(2)}</p>
        {floristName && (
          <p className="text-sm text-gray-500 font-extralight">By {floristName}</p>
        )}
      </CardContent>
      <CardFooter className="px-0 pt-0">
        <Button 
          variant="outline"
          size="icon"
          onClick={handleAddToCart}
          className="rounded-none hover:bg-black hover:text-white transition-colors duration-300"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};