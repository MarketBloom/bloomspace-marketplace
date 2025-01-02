import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductInfo } from "@/components/product/ProductInfo";
import { AddToCartButton } from "@/components/product/AddToCartButton";

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
  images, 
  floristName,
  floristId 
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer bg-white hover:shadow-lg border-0"
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <ProductInfo 
          title={title} 
          price={price} 
          floristName={floristName} 
        />
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <AddToCartButton
          id={id}
          title={title}
          price={price}
          image={images?.[0]}
          floristId={floristId}
          floristName={floristName}
        />
      </CardFooter>
    </Card>
  );
};