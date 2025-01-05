import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { VariantImageUpload } from "./VariantImageUpload";

interface Size {
  name: string;
  price: string;
  isDefault: boolean;
  images?: string[];
}

interface VariantRowProps {
  size: Size;
  index: number;
  isUploading: boolean;
  onSizeChange: (index: number, field: keyof Size, value: any) => void;
  onRemoveSize: (index: number) => void;
  onDefaultChange: (index: number, checked: boolean) => void;
  onUploadStart: () => void;
  onUploadEnd: () => void;
}

export const VariantRow = ({
  size,
  index,
  isUploading,
  onSizeChange,
  onRemoveSize,
  onDefaultChange,
  onUploadStart,
  onUploadEnd,
}: VariantRowProps) => {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Size Name</Label>
          <Input
            value={size.name}
            onChange={(e) => onSizeChange(index, "name", e.target.value)}
            placeholder="Size name"
          />
        </div>
        <div className="w-32">
          <Label>Price</Label>
          <Input
            type="number"
            value={size.price}
            onChange={(e) => onSizeChange(index, "price", e.target.value)}
            placeholder="Price"
            step="0.01"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Checkbox
            id={`default-${index}`}
            checked={size.isDefault}
            onCheckedChange={(checked) => onDefaultChange(index, checked as boolean)}
          />
          <Label htmlFor={`default-${index}`}>Default</Label>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemoveSize(index)}
          className="mt-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Variant Images (Optional)</Label>
        <VariantImageUpload
          images={size.images || []}
          onImagesChange={(newImages) => onSizeChange(index, "images", newImages)}
          isUploading={isUploading}
          onUploadStart={onUploadStart}
          onUploadEnd={onUploadEnd}
        />
      </div>
    </div>
  );
};