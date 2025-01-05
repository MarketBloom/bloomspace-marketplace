import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProductListItem } from "./product-list/ProductListItem";
import { Product } from "../../types/product";

interface ProductListProps {
  products: Product[];
  onProductDeleted: () => void;
}

export const ProductList = ({ products, onProductDeleted }: ProductListProps) => {
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast.success("Product deleted successfully");
      onProductDeleted();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      const sizes = product.product_sizes || [];
      const defaultSize = sizes.find(size => size.isDefault);
      
      if (!defaultSize) {
        toast.error("Please set a default size");
        return;
      }

      // Update product sizes
      const { error: sizesError } = await supabase
        .from('product_sizes')
        .upsert(
          sizes.map(size => ({
            id: size.id.startsWith('temp-') ? undefined : size.id,
            product_id: product.id,
            name: size.name,
            price_adjustment: size.price - defaultSize.price,
            is_default: size.isDefault,
          }))
        );

      if (sizesError) throw sizesError;

      // Update base product price
      const { error: productError } = await supabase
        .from('products')
        .update({ price: defaultSize.price })
        .eq('id', product.id);

      if (productError) throw productError;

      toast.success("Changes saved successfully");
      onProductDeleted(); // Refresh the product list
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          isExpanded={expandedProducts.includes(product.id)}
          onToggle={() => toggleProduct(product.id)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};