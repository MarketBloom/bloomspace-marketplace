interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  const [mainTitle, ...sizeParts] = title.split(' - ');
  const size = sizeParts.join(' - ');

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h3 className="text-[20px] font-semibold leading-tight text-foreground line-clamp-2">
          {mainTitle}
        </h3>
        {displaySize && (
          <p className="text-[15px] text-foreground font-normal">
            {displaySize}
          </p>
        )}
        {floristName && (
          <p className="text-[13px] text-muted-foreground font-normal">
            By {floristName}
          </p>
        )}
      </div>
      <p className="text-[17px] font-semibold text-foreground">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};