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

  // Split the title into parts for better formatting
  const titleParts = title.split(' - ');
  const mainTitle = titleParts[0];
  const size = titleParts[1];
  const details = titleParts[2];

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-0 leading-tight">
          <h3 className="text-[40px] font-semibold">
            {mainTitle}
          </h3>
          {size && (
            <h4 className="text-[40px] font-semibold">
              - {size} -
            </h4>
          )}
          {details && (
            <h4 className="text-[40px] font-semibold">
              {details}
            </h4>
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

      {/* Price Section */}
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-medium">From</span>
          <p className="text-[40px] font-semibold">
            ${price.toFixed(2)}
          </p>
        </div>

        <p className="text-[20px] font-medium text-muted-foreground">
          Standard Size
        </p>

        {floristName && (
          <p className="text-[20px] font-medium text-muted-foreground">
            By {floristName}
          </p>
        )}
      </div>
    </div>
  );
};