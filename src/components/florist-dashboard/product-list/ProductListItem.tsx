import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Size } from "../../../types/product";
import { SizeVariantEditor } from "./SizeVariantEditor";

interface ProductListItemProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
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
  const [editingSizes, setEditingSizes] = useState<Size[]>(product.product_sizes || []);
  const [isEditing, setIsEditing] = useState(false);

  const handleSizeChange = (sizeId: string, field: keyof Size, value: string | number | boolean) => {
    setEditingSizes(prev => 
      prev.map(size => size.id === sizeId ? { ...size, [field]: value } : size)
    );
  };

  const addNewSize = () => {
    const newSize: Size = {
      id: `temp-${Date.now()}`,
      name: '',
      price: 0,
      isDefault: false
    };
    setEditingSizes(prev => [...prev, newSize]);
  };

  const removeSize = (sizeId: string) => {
    setEditingSizes(prev => prev.filter(size => size.id !== sizeId));
  };

  const handleSave = async () => {
    await onEdit({
      ...product,
      product_sizes: editingSizes
    });
    setIsEditing(false);
  };

  return (
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
            <h3 className="font-semibold">{product.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
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
          <h4 className="text-sm font-medium mb-2">Size Variants</h4>
          {isEditing ? (
            <div className="space-y-4">
              {editingSizes.map((size) => (
                <SizeVariantEditor
                  key={size.id}
                  size={size}
                  onChange={handleSizeChange}
                  onRemove={removeSize}
                />
              ))}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewSize}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Size
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {product.product_sizes?.map((size) => (
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
          )}
        </div>
      )}
    </div>
  );
};