import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("products").insert({
        florist_id: floristId,
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: selectedCategories[0], // Primary category
        occasion: selectedOccasions, // Array of occasions
      });

      if (error) throw error;

      toast.success("Product added successfully");
      setNewProduct({ title: "", description: "", price: "", category: "" });
      setSelectedCategories([]);
      setSelectedOccasions([]);
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