import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface Size {
  name: string;
  price: string;
  isDefault: boolean;
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
  });

  const handleAddSize = () => {
    if (!newSize.name || !newSize.price) return;
    setSizes([...sizes, newSize]);
    setNewSize({ name: "", price: "", isDefault: false });
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
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
          <div key={index} className="flex items-center gap-4">
            <Input
              value={size.name}
              onChange={(e) => {
                const newSizes = [...sizes];
                newSizes[index].name = e.target.value;
                setSizes(newSizes);
              }}
              placeholder="Size name"
              className="flex-1"
            />
            <div className="w-32">
              <Input
                type="number"
                value={size.price}
                onChange={(e) => {
                  const newSizes = [...sizes];
                  newSizes[index].price = e.target.value;
                  setSizes(newSizes);
                }}
                placeholder="Price"
                step="0.01"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`default-${index}`}
                checked={size.isDefault}
                onCheckedChange={(checked) => handleDefaultChange(index, checked as boolean)}
              />
              <Label htmlFor={`default-${index}`}>Default</Label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSize(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Input
            value={newSize.name}
            onChange={(e) =>
              setNewSize({ ...newSize, name: e.target.value })
            }
            placeholder="Size name"
          />
        </div>
        <div className="w-32">
          <Input
            type="number"
            value={newSize.price}
            onChange={(e) =>
              setNewSize({ ...newSize, price: e.target.value })
            }
            placeholder="Price"
            step="0.01"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="new-size-default"
            checked={newSize.isDefault}
            onCheckedChange={(checked) =>
              setNewSize({ ...newSize, isDefault: checked as boolean })
            }
          />
          <Label htmlFor="new-size-default">Default</Label>
        </div>
        <Button onClick={handleAddSize}>Add Size</Button>
      </div>
    </div>
  );
};