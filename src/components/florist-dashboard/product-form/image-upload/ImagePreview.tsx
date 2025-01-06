import { Card } from "@/components/ui/card";

interface ImagePreviewProps {
  currentImage: string | null;
  imageRef: HTMLImageElement | null;
  crop: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export const ImagePreview = ({ currentImage, imageRef, crop }: ImagePreviewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-muted-foreground mb-2">
        Preview how your image will appear on the product card
      </div>
      
      <Card className="aspect-[4/5] w-full relative overflow-hidden">
        {currentImage && imageRef && (
          <div className="absolute inset-0">
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${100 / crop.width})`,
                transformOrigin: 'top left',
                marginLeft: `-${crop.x}%`,
                marginTop: `-${crop.y}%`,
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};