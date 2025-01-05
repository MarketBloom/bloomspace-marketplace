import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Size {
  id: string;
  name: string;
  price: number;
  isDefault: boolean;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  product_sizes?: Size[];
}

interface ProductListProps {
  products: Product[];
  onProductDeleted: () => void;
}

export const ProductList = ({ products, onProductDeleted }: ProductListProps) => {
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingSizes, setEditingSizes] = useState<{ [key: string]: Size[] }>({});

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

  const startEditing = (product: Product) => {
    setEditingProduct(product.id);
    setEditingSizes({ [product.id]: product.product_sizes || [] });
  };

  const handleSizeChange = (productId: string, sizeId: string, field: keyof Size, value: string | number | boolean) => {
    setEditingSizes(prev => ({
      ...prev,
      [productId]: prev[productId].map(size => 
        size.id === sizeId ? { ...size, [field]: value } : size
      )
    }));
  };

  const addNewSize = (productId: string) => {
    const newSize: Size = {
      id: `temp-${Date.now()}`,
      name: '',
      price: 0,
      isDefault: false
    };

    setEditingSizes(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newSize]
    }));
  };

  const removeSize = (productId: string, sizeId: string) => {
    setEditingSizes(prev => ({
      ...prev,
      [productId]: prev[productId].filter(size => size.id !== sizeId)
    }));
  };

  const saveChanges = async (productId: string) => {
    try {
      const sizes = editingSizes[productId];
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
            product_id: productId,
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
        .eq('id', productId);

      if (productError) throw productError;

      toast.success("Changes saved successfully");
      setEditingProduct(null);
      onProductDeleted(); // Refresh the product list
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProduct(product.id)}
                    className="p-0 h-auto"
                  >
                    {expandedProducts.includes(product.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <h3 className="font-semibold">{product.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startEditing(product)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {expandedProducts.includes(product.id) && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Size Variants</h4>
                <div className="space-y-2">
                  {editingProduct === product.id ? (
                    <div className="space-y-4">
                      {editingSizes[product.id]?.map((size, index) => (
                        <div key={size.id} className="flex items-center gap-4">
                          <Input
                            value={size.name}
                            onChange={(e) => handleSizeChange(product.id, size.id, 'name', e.target.value)}
                            placeholder="Size name"
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={size.price}
                            onChange={(e) => handleSizeChange(product.id, size.id, 'price', parseFloat(e.target.value))}
                            placeholder="Price"
                            className="w-32"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={size.isDefault}
                              onChange={() => {
                                const updatedSizes = editingSizes[product.id].map(s => ({
                                  ...s,
                                  isDefault: s.id === size.id
                                }));
                                setEditingSizes(prev => ({
                                  ...prev,
                                  [product.id]: updatedSizes
                                }));
                              }}
                              className="mr-1"
                            />
                            <span className="text-sm">Default</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSize(product.id, size.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addNewSize(product.id)}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" /> Add Size
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => saveChanges(product.id)}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    product.product_sizes && product.product_sizes.length > 0 ? (
                      product.product_sizes.map((size) => (
                        <div 
                          key={size.id} 
                          className="flex justify-between items-center p-2 bg-muted rounded-md"
                        >
                          <div>
                            <span className="font-medium">{size.name}</span>
                            {size.isDefault && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <span className="font-medium">${size.price}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Base price: ${product.price}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};