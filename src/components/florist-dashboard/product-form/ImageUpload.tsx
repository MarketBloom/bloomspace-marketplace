import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  uploadedImages: string[];
  setUploadedImages: (images: string[]) => void;
}

export const ImageUpload = ({ uploadedImages, setUploadedImages }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    aspect: 4/5
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setCurrentImage(reader.result as string);
      setCropDialogOpen(true);
    };
    
    reader.readAsDataURL(file);
  };

  const getCroppedImage = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!imageRef || !crop) {
        reject(new Error('No image or crop data'));
        return;
      }

      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      
      canvas.width = (crop.width * imageRef.width) / 100;
      canvas.height = (crop.height * imageRef.height) / 100;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('No 2d context'));
        return;
      }

      ctx.drawImage(
        imageRef,
        (crop.x * imageRef.width) / 100,
        (crop.y * imageRef.height) / 100,
        (crop.width * imageRef.width) / 100,
        (crop.height * imageRef.height) / 100,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleCropComplete = async () => {
    try {
      setIsUploading(true);
      const croppedBlob = await getCroppedImage();
      const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
      
      const fileExt = 'jpg';
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("florist-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("florist-images")
        .getPublicUrl(filePath);

      setUploadedImages([...uploadedImages, publicUrl]);
      toast.success("Image uploaded successfully");
      setCropDialogOpen(false);
      setCurrentImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Label htmlFor="images" className="block mb-2">Product Images</Label>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Product ${index + 1}`} 
                className="w-24 h-[30px] object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            id="images"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("images")?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ImagePlus className="w-4 h-4 mr-2" />
                Upload Images
              </>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="overflow-auto max-h-[600px]">
              {currentImage && (
                <ReactCrop
                  crop={crop}
                  onChange={c => setCrop(c)}
                  aspect={4/5}
                  className="max-w-full"
                >
                  <img
                    src={currentImage}
                    onLoad={(e) => setImageRef(e.currentTarget)}
                    alt="Crop preview"
                  />
                </ReactCrop>
              )}
            </div>
            
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
              
              <Button 
                onClick={handleCropComplete}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Crop & Upload"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};