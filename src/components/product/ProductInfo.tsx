import { useIsMobile } from "@/hooks/use-mobile";

interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-0.5 md:space-y-1">
      <h3 className="text-sm font-medium text-white md:text-black line-clamp-1 break-words">
        {title}
      </h3>
      {floristName && (
        <p className="text-xs text-white/80 md:text-black/60 font-normal line-clamp-1">
          {floristName}
        </p>
      )}
      <div className="flex justify-between items-center">
        <p className="text-xs text-white/90 md:text-black/80 line-clamp-1 max-w-[60%]">
          {displaySize || "Standard"}
        </p>
        <p className="text-xs font-medium text-white md:text-selective_yellow whitespace-nowrap pl-1">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};