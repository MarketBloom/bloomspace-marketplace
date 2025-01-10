import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface BulkEditProductsProps {
  products: Product[];
  onProductsUpdated: () => void;
}

export const BulkEditProducts = ({ products, onProductsUpdated }: BulkEditProductsProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkUpdateField, setBulkUpdateField] = useState<string>("");
  const [bulkUpdateValue, setBulkUpdateValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkUpdate = async () => {
    if (!bulkUpdateField || !bulkUpdateValue || selectedProducts.length === 0) {
      toast.error("Please select products and specify what to update");
      return;
    }

    setIsUpdating(true);

    try {
      const updateData = {
        [bulkUpdateField]: 
          bulkUpdateField === "price" ? parseFloat(bulkUpdateValue) :
          bulkUpdateField === "in_stock" ? bulkUpdateValue === "true" :
          bulkUpdateValue
      };

      const { error } = await supabase
        .from("products")
        .update(updateData)
        .in("id", selectedProducts);

      if (error) throw error;

      toast.success(`Successfully updated ${selectedProducts.length} products`);
      onProductsUpdated();
      setSelectedProducts([]);
      setBulkUpdateField("");
      setBulkUpdateValue("");
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Failed to update products");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Edit Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Product Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedProducts.length === products.length}
                onCheckedChange={handleSelectAll}
              />
              <span>Select All Products</span>
            </div>
            <div className="grid gap-2">
              {products.map(product => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleProductSelect(product.id)}
                  />
                  <span>{product.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bulk Update Controls */}
          <div className="grid gap-4">
            <Select
              value={bulkUpdateField}
              onValueChange={setBulkUpdateField}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field to update" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="is_hidden">Visibility</SelectItem>
              </SelectContent>
            </Select>

            {bulkUpdateField === "in_stock" || bulkUpdateField === "is_hidden" ? (
              <Select
                value={bulkUpdateValue}
                onValueChange={setBulkUpdateValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={bulkUpdateField === "price" ? "number" : "text"}
                value={bulkUpdateValue}
                onChange={(e) => setBulkUpdateValue(e.target.value)}
                placeholder="Enter new value"
              />
            )}

            <Button 
              onClick={handleBulkUpdate}
              disabled={isUpdating || selectedProducts.length === 0 || !bulkUpdateField || !bulkUpdateValue}
            >
              {isUpdating ? "Updating..." : "Update Selected Products"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};