import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";

interface UploadButtonProps {
  isUploading: boolean;
  onClick: () => void;
}

export const UploadButton = ({ isUploading, onClick }: UploadButtonProps) => {
  return (
    <div>
      <input
        type="file"
        id="images"
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
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
  );
};