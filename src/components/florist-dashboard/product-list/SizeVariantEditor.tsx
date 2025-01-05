import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Size } from "../../../types/product";

interface SizeVariantEditorProps {
  size: Size;
  onChange: (sizeId: string, field: keyof Size, value: string | number | boolean) => void;
  onRemove: (sizeId: string) => void;
}

export const SizeVariantEditor = ({
  size,
  onChange,
  onRemove,
}: SizeVariantEditorProps) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={size.name}
        onChange={(e) => onChange(size.id, 'name', e.target.value)}
        placeholder="Size name"
        className="flex-1"
      />
      <Input
        type="number"
        value={size.price}
        onChange={(e) => onChange(size.id, 'price', parseFloat(e.target.value))}
        placeholder="Price"
        className="w-32"
      />
      <div className="flex items-center gap-2">
        <input
          type="radio"
          checked={size.isDefault}
          onChange={(e) => onChange(size.id, 'isDefault', e.target.checked)}
          className="mr-1"
        />
        <span className="text-sm">Default</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(size.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};