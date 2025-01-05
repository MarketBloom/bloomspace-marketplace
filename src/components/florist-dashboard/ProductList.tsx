import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
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
                <Button variant="outline" size="sm">
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
                  {product.product_sizes && product.product_sizes.length > 0 ? (
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