import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "./product-form/ImageUpload";
import { ProductBasicInfo } from "./product-form/ProductBasicInfo";
import { CategorySelection } from "./product-form/CategorySelection";
import { OccasionSelection } from "./product-form/OccasionSelection";
import { ProductSizes } from "./product-form/ProductSizes";

interface AddProductFormProps {
  floristId: string;
  onProductAdded: () => void;
}

interface Size {
  name: string;
  price: string;
  isDefault: boolean;
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
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please add at least one size option");
      return;
    }

    try {
      // Get the default size's price as the base product price
      const defaultSize = sizes.find(size => size.isDefault);
      if (!defaultSize) {
        toast.error("Please set a default size");
        return;
      }

      // First insert the product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert({
          florist_id: floristId,
          title: newProduct.title,
          description: newProduct.description,
          price: parseFloat(defaultSize.price),
          category: selectedCategories[0],
          occasion: selectedOccasions,
          images: uploadedImages,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Then insert the sizes
      const { error: sizesError } = await supabase
        .from("product_sizes")
        .insert(
          sizes.map(size => ({
            product_id: productData.id,
            name: size.name,
            price_adjustment: parseFloat(size.price) - parseFloat(defaultSize.price),
            is_default: size.isDefault,
          }))
        );

      if (sizesError) throw sizesError;

      toast.success("Product added successfully");
      setNewProduct({ title: "", description: "" });
      setSelectedCategories([]);
      setSelectedOccasions([]);
      setUploadedImages([]);
      setSizes([]);
      onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
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
          />

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Product Sizes and Pricing</h2>
            <ProductSizes sizes={sizes} setSizes={setSizes} />
          </div>

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