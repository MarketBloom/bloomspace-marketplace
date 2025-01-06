interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-0.5">
        <h3 className="text-[14px] font-semibold leading-tight text-foreground line-clamp-2">
          {title}
        </h3>
        {floristName && (
          <p className="text-[11px] text-muted-foreground font-normal">
            By {floristName}
          </p>
        )}
      </div>
      <p className="text-[13px] font-semibold text-foreground">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};