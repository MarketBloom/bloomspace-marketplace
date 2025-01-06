interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-1.5">
        <h3 className="text-[15px] font-semibold leading-tight text-foreground line-clamp-1">
          {title}
        </h3>
        {floristName && (
          <p className="text-[12px] text-muted-foreground font-normal">
            {floristName}
          </p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-[12px] text-foreground">
            {displaySize || "Standard"}
          </p>
          <p className="text-[12px] font-medium text-foreground">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};