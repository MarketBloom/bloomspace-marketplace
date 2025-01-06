import { useState } from "react";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Crop } from 'react-image-crop';
import { UploadedImages } from "./image-upload/UploadedImages";
import { UploadButton } from "./image-upload/UploadButton";
import { CropDialog } from "./image-upload/CropDialog";

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
    y: 0
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
        <UploadedImages images={uploadedImages} onRemove={removeImage} />
        <UploadButton
          isUploading={isUploading}
          onClick={() => document.getElementById("images")?.click()}
        />
      </div>

      <input
        type="file"
        id="images"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
        disabled={isUploading}
      />

      <CropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        currentImage={currentImage}
        crop={crop}
        onCropChange={setCrop}
        onImageLoad={setImageRef}
        imageRef={imageRef}
        onCropComplete={handleCropComplete}
        isUploading={isUploading}
      />
    </div>
  );
};