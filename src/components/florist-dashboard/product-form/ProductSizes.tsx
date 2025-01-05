import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [isUploading, setIsUploading] = useState<number | null>(null);

  const handleAddSize = () => {
    if (!newSize.name || !newSize.price) return;
    setSizes([...sizes, newSize]);
    setNewSize({ name: "", price: "", isDefault: false, images: [] });
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setIsUploading(index);
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("florist-images")
          .upload(filePath, file);

        if (uploadError) {
          toast.error(`Failed to upload image ${file.name}`);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("florist-images")
          .getPublicUrl(filePath);

        newImages.push(publicUrl);
      }

      const newSizes = [...sizes];
      newSizes[index] = {
        ...newSizes[index],
        images: [...(newSizes[index].images || []), ...newImages],
      };
      setSizes(newSizes);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(null);
    }
  };

  const removeImage = (sizeIndex: number, imageIndex: number) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex] = {
      ...newSizes[sizeIndex],
      images: newSizes[sizeIndex].images?.filter((_, i) => i !== imageIndex),
    };
    setSizes(newSizes);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {sizes.map((size, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label>Size Name</Label>
                <Input
                  value={size.name}
                  onChange={(e) => {
                    const newSizes = [...sizes];
                    newSizes[index].name = e.target.value;
                    setSizes(newSizes);
                  }}
                  placeholder="Size name"
                />
              </div>
              <div className="w-32">
                <Label>Price</Label>
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
              <div className="flex items-center gap-2 pt-6">
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
                className="mt-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Variant Images (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {size.images?.map((image, imageIndex) => (
                  <div key={imageIndex} className="relative group">
                    <img
                      src={image}
                      alt={`Variant ${size.name} ${imageIndex + 1}`}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, imageIndex)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <div>
                  <input
                    type="file"
                    id={`variant-images-${index}`}
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                    disabled={isUploading === index}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById(`variant-images-${index}`)?.click()}
                    disabled={isUploading === index}
                  >
                    {isUploading === index ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <ImagePlus className="w-4 h-4 mr-2" />
                        Add Images
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
        <div className="flex items-center gap-2">
          <Checkbox
            id="new-size-default"
            checked={newSize.isDefault}
            onCheckedChange={(checked) => setNewSize({ ...newSize, isDefault: checked as boolean })}
          />
          <Label htmlFor="new-size-default">Default</Label>
        </div>
        <Button onClick={handleAddSize}>Add Size</Button>
      </div>
    </div>
  );
};