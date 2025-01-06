interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  return (
    <div className="flex flex-col justify-end h-full space-y-1">
      <h3 className="text-[17px] font-semibold leading-tight text-foreground min-h-[42px] line-clamp-2">
        {title}
      </h3>
      {floristName && (
        <p className="text-[12px] text-muted-foreground font-normal">
          By {floristName}
        </p>
      )}
      {displaySize && (
        <p className="text-[14px] text-foreground font-normal">
          {displaySize}
        </p>
      )}
      <p className="text-[15px] font-semibold text-foreground mt-auto">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};