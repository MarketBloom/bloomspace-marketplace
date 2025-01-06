import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "./ImagePreview";

interface CropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentImage: string | null;
  crop: Crop;
  onCropChange: (crop: Crop) => void;
  onImageLoad: (img: HTMLImageElement) => void;
  imageRef: HTMLImageElement | null;
  onCropComplete: () => void;
  isUploading: boolean;
}

export const CropDialog = ({
  open,
  onOpenChange,
  currentImage,
  crop,
  onCropChange,
  onImageLoad,
  imageRef,
  onCropComplete,
  isUploading,
}: CropDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="overflow-auto max-h-[600px]">
            {currentImage && (
              <ReactCrop
                crop={crop}
                onChange={onCropChange}
                aspect={4/5}
                className="max-w-full"
              >
                <img
                  src={currentImage}
                  onLoad={(e) => onImageLoad(e.currentTarget)}
                  alt="Crop preview"
                />
              </ReactCrop>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <ImagePreview
              currentImage={currentImage}
              imageRef={imageRef}
              crop={crop}
            />
            
            <Button 
              onClick={onCropComplete}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Crop & Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};