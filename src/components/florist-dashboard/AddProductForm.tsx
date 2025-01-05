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
import { Separator } from "@/components/ui/separator";
import { Size } from "@/types/product";

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
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.title.trim()) {
      toast.error("Please enter a product title");
      return;
    }

    if (!newProduct.description.trim()) {
      toast.error("Please enter a product description");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please add at least one size option");
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, insert the product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert({
          florist_id: floristId,
          title: newProduct.title,
          description: newProduct.description,
          price: parseFloat(sizes[0].price), // Base price from first size
          images: uploadedImages,
          category: selectedCategories[0], // Primary category
          occasion: selectedOccasions,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Then, insert all size variants
      const sizesData = sizes.map((size, index) => ({
        product_id: productData.id,
        name: size.name,
        price_adjustment: index === 0 ? 0 : parseFloat(size.price) - parseFloat(sizes[0].price),
        images: size.images || [],
        is_default: index === 0 // First size is default
      }));

      const { error: sizesError } = await supabase
        .from("product_sizes")
        .insert(sizesData);

      if (sizesError) throw sizesError;

      toast.success("Product added successfully");
      
      // Reset form
      setNewProduct({ title: "", description: "" });
      setSelectedCategories([]);
      setSelectedOccasions([]);
      setUploadedImages([]);
      setSizes([]);
      
      // Refresh product list
      onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleAddProduct} className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <ProductBasicInfo
              title={newProduct.title}
              setTitle={(title) => setNewProduct({ ...newProduct, title })}
              description={newProduct.description}
              setDescription={(description) => setNewProduct({ ...newProduct, description })}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Product Images</h3>
            <ImageUpload
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Product Sizes and Pricing</h3>
            <ProductSizes sizes={sizes} setSizes={setSizes} />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories and Occasions</h3>
            <div className="grid gap-6">
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
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};