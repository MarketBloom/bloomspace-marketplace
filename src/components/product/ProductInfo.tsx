interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
  displaySize?: string | null;
}

export const ProductInfo = ({ title, price, floristName, displaySize }: ProductInfoProps) => {
  // Split only on the first hyphen to preserve any other hyphens in the size description
  const [mainTitle, ...sizeParts] = title.split(' - ');
  const size = sizeParts.join(' - '); // Rejoin any remaining parts with hyphens

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h3 className="text-[17px] font-semibold leading-tight text-foreground">
          {mainTitle}
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
      </div>
      <p className="text-[15px] font-semibold text-foreground">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};