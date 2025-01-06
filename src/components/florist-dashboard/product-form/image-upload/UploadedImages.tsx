import { X } from "lucide-react";

interface UploadedImagesProps {
  images: string[];
  onRemove: (index: number) => void;
}

export const UploadedImages = ({ images, onRemove }: UploadedImagesProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img 
            src={image} 
            alt={`Product ${index + 1}`} 
            className="w-24 h-[30px] object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};