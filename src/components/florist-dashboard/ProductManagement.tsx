import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface ProductManagementProps {
  products: Product[];
  floristId: string;
  onProductAdded: () => void;
}

export const ProductManagement = ({ products, floristId, onProductAdded }: ProductManagementProps) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const { toast } = useToast();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("products").insert({
        florist_id: floristId,
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
      });

      if (error) throw error;

      toast({
        title: "Product added successfully",
      });
      setNewProduct({ title: "", description: "", price: "", category: "" });
      onProductAdded();
    } catch (error) {
      toast({
        title: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Add New Product</h2>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold">Current Products</h2>
      {products?.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              <p className="font-semibold">${product.price}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};