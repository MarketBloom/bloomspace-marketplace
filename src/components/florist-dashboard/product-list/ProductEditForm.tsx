import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "../product-form/ImageUpload";
import { ProductBasicInfo } from "../product-form/ProductBasicInfo";
import { CategorySelection } from "../product-form/CategorySelection";
import { OccasionSelection } from "../product-form/OccasionSelection";
import { ProductSizes } from "../product-form/ProductSizes";
import { Separator } from "@/components/ui/separator";
import { Size } from "@/types/product";

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

interface ProductEditFormProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    images?: string[];
    category?: string;
    occasion?: string[];
    product_sizes?: Size[];
  };
  onSave: (product: any) => Promise<void>;
  onCancel: () => void;
}

export const ProductEditForm = ({ product, onSave, onCancel }: ProductEditFormProps) => {
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description || "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product.category ? [product.category] : []
  );
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    product.occasion || []
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    product.images || []
  );
  const [sizes, setSizes] = useState<Size[]>(
    product.product_sizes?.map(size => ({
      id: size.id,
      name: size.name,
      price: size.price.toString(),
      isDefault: size.isDefault,
      images: [],
    })) || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const defaultSize = sizes.find(size => size.isDefault);
    if (!defaultSize) {
      alert("Please set a default size");
      return;
    }

    const updatedProduct = {
      id: product.id,
      title: editedProduct.title,
      description: editedProduct.description,
      price: parseFloat(defaultSize.price),
      category: selectedCategories[0],
      occasion: selectedOccasions,
      images: uploadedImages,
      product_sizes: sizes,
    };

    await onSave(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <ProductBasicInfo
          title={editedProduct.title}
          setTitle={(title) => setEditedProduct({ ...editedProduct, title })}
          description={editedProduct.description}
          setDescription={(description) => setEditedProduct({ ...editedProduct, description })}
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

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};