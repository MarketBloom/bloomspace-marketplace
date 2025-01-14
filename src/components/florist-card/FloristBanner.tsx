import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloristBannerProps {
  bannerUrl?: string | null;
  logoUrl?: string | null;
  storeName: string;
  isFavorite: boolean;
  isCheckingFavorite: boolean;
  onToggleFavorite: () => void;
}

export const FloristBanner = ({
  bannerUrl,
  logoUrl,
  storeName,
  isFavorite,
  isCheckingFavorite,
  onToggleFavorite,
}: FloristBannerProps) => {
  return (
    <div className="relative h-48">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt={`${storeName} banner`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No banner image</span>
        </div>
      )}
      {logoUrl && (
        <div className="absolute -bottom-8 left-4">
          <img
            src={logoUrl}
            alt={`${storeName} logo`}
            className="w-16 h-16 rounded-full border-4 border-white object-cover bg-white"
          />
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-4 right-4 bg-white/80 hover:bg-white",
          isFavorite && "text-red-500 hover:text-red-600"
        )}
        onClick={onToggleFavorite}
        disabled={isCheckingFavorite}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
      </Button>
    </div>
  );
};