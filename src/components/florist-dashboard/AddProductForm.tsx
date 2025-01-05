import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "./product-form/ImageUpload";
import { ProductBasicInfo } from "./product-form/ProductBasicInfo";
import { CategorySelection } from "./product-form/CategorySelection";
import { OccasionSelection } from "./product-form/OccasionSelection";

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
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

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
      setNewProduct({ title: "", description: "", price: "" });
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
          <ProductBasicInfo
            title={newProduct.title}
            setTitle={(title) => setNewProduct({ ...newProduct, title })}
            description={newProduct.description}
            setDescription={(description) => setNewProduct({ ...newProduct, description })}
            price={newProduct.price}
            setPrice={(price) => setNewProduct({ ...newProduct, price })}
          />

          <ImageUpload
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />

          <CategorySelection
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <OccasionSelection
            occasions={occasions}
            selectedOccasions={selectedOccasions}
            setSelectedOccasions={setSelectedOccasions}
          />

          <Button type="submit" className="w-full">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};