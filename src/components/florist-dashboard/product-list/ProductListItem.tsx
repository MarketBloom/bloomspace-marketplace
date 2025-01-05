import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Size } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductEditForm } from "./ProductEditForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-start gap-4 p-4">
            {/* Product Image */}
            <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Base price: ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Categories and Occasions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {product.category && (
                  <Badge variant="secondary">{product.category}</Badge>
                )}
                {product.occasion?.map((occ) => (
                  <Badge key={occ} variant="outline">{occ}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="border-t bg-muted/50">
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Size Variants</h4>
                  <div className="space-y-2">
                    {product.product_sizes?.map((size) => (
                      <div
                        key={size.id}
                        className="flex justify-between items-center p-3 bg-background rounded-md"
                      >
                        <span className="font-medium">{size.name}</span>
                        <span>${parseFloat(size.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {product.images && product.images.length > 1 && (
                  <div>
                    <h4 className="font-medium mb-2">Additional Images</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {product.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.title} ${index + 2}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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