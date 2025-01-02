import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  floristName?: string;
}

export const ProductCard = ({ id, title, price, description, images, floristName }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">${price.toFixed(2)}</p>
        {floristName && (
          <p className="text-sm text-gray-500">By {floristName}</p>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="w-full"
          onClick={() => navigate(`/product/${id}`)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            // TODO: Implement add to cart functionality
            console.log("Add to cart:", id);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};