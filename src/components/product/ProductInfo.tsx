interface ProductInfoProps {
  title: string;
  price: number;
  floristName?: string;
}

export const ProductInfo = ({ title, price, floristName }: ProductInfoProps) => {
  return (
    <div className="text-left space-y-1">
      <h2 className="text-[32px] font-semibold leading-tight tracking-tight">
        {title}
      </h2>
      {floristName && (
        <p className="text-xl text-foreground/90 font-medium">
          {floristName}
        </p>
      )}
      <p className="text-lg text-foreground/80">
        From ${price.toFixed(2)}
      </p>
    </div>
  );
};