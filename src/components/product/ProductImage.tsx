import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className }: ProductImageProps) => {
  return (
    <div className={cn("relative pb-[125%] overflow-hidden bg-secondary rounded-t-lg", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
};