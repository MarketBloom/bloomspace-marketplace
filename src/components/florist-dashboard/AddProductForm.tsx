import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { ImagePlus, Loader2, X } from "lucide-react";

interface AddProductFormProps {
  floristId: string;
  onProductAdded: () => void;
}

const categories = [
  "Bouquets",
  "Arrangements",
  "Roses",
  "Lilies",
  "Sunflowers",
  "Mixed Flowers",
  "Plants",
  "Seasonal"
];

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Sympathy",
  "Get Well",
  "Thank You",
  "New Baby",
  "Congratulations",
  "Just Because"
];

export const AddProductForm = ({ floristId, onProductAdded }: AddProductFormProps) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setIsUploading(true);
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
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

      setUploadedImages([...uploadedImages, ...newImages]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    try {
      const { error } = await supabase.from("products").insert({
        florist_id: floristId,
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: selectedCategories[0],
        occasion: selectedOccasions,
        images: uploadedImages,
      });

      if (error) throw error;

      toast.success("Product added successfully");
      setNewProduct({ title: "", description: "", price: "", category: "" });
      setSelectedCategories([]);
      setSelectedOccasions([]);
      setUploadedImages([]);
      onProductAdded();
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="images" className="block mb-2">Product Images</Label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Product ${index + 1}`} 
                        className="w-24 h-24 object-cover rounded-lg border"
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
                    multiple
                    onChange={handleImageUpload}
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
            </div>
          </div>

          <div>
            <Label className="text-base">Categories</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select the categories that best describe your product
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                      }
                    }}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base">Occasions</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select the occasions this product is suitable for
            </p>
            <div className="grid grid-cols-2 gap-4">
              {occasions.map((occasion) => (
                <div key={occasion} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`occasion-${occasion}`}
                    checked={selectedOccasions.includes(occasion)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedOccasions([...selectedOccasions, occasion]);
                      } else {
                        setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
                      }
                    }}
                  />
                  <Label htmlFor={`occasion-${occasion}`} className="text-sm font-normal">
                    {occasion}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};