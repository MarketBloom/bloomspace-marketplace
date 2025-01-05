import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VariantRow } from "./VariantRow";

interface Size {
  name: string;
  price: string;
  isDefault: boolean;
  images?: string[];
}

interface ProductSizesProps {
  sizes: Size[];
  setSizes: (sizes: Size[]) => void;
}

export const ProductSizes = ({ sizes, setSizes }: ProductSizesProps) => {
  const [newSize, setNewSize] = useState<Size>({
    name: "",
    price: "",
    isDefault: false,
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleAddSize = () => {
    if (!newSize.name || !newSize.price) return;
    setSizes([...sizes, newSize]);
    setNewSize({ name: "", price: "", isDefault: false, images: [] });
  };

  const handleSizeChange = (index: number, field: keyof Size, value: any) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const handleDefaultChange = (index: number, checked: boolean) => {
    const newSizes = sizes.map((size, i) => ({
      ...size,
      isDefault: i === index ? checked : checked ? false : size.isDefault,
    }));
    setSizes(newSizes);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {sizes.map((size, index) => (
          <VariantRow
            key={index}
            size={size}
            index={index}
            isUploading={isUploading}
            onSizeChange={handleSizeChange}
            onRemoveSize={(index) => setSizes(sizes.filter((_, i) => i !== index))}
            onDefaultChange={handleDefaultChange}
            onUploadStart={() => setIsUploading(true)}
            onUploadEnd={() => setIsUploading(false)}
          />
        ))}
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label>New Size Name</Label>
          <Input
            value={newSize.name}
            onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
            placeholder="Size name"
          />
        </div>
        <div className="w-32">
          <Label>Price</Label>
          <Input
            type="number"
            value={newSize.price}
            onChange={(e) => setNewSize({ ...newSize, price: e.target.value })}
            placeholder="Price"
            step="0.01"
          />
        </div>
        <Button onClick={handleAddSize}>Add Size</Button>
      </div>
    </div>
  );
};