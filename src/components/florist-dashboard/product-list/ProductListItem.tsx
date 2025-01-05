import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Size } from "../../../types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductEditForm } from "./ProductEditForm";

interface ProductListItemProps {
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
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onEdit: (product: any) => void;
}

export const ProductListItem = ({
  product,
  isExpanded,
  onToggle,
  onDelete,
  onEdit,
}: ProductListItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="p-0 h-auto"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{product.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Occasions</p>
                  <p className="text-sm text-muted-foreground">
                    {product.occasion?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>
              {product.images && product.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Images</p>
                  <div className="flex gap-2">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                </div>
              )}
              {product.product_sizes && product.product_sizes.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Size Variants</p>
                  <div className="space-y-2">
                    {product.product_sizes.map((size) => (
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductEditForm 
            product={product}
            onSave={async (updatedProduct) => {
              await onEdit(updatedProduct);
              setIsEditDialogOpen(false);
            }}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};