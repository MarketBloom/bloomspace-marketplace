import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, DollarSign, Star, Package } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const FloristDashboard = () => {
  const { user } = useAuth();
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const { data: floristProfile } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("florist_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: orders } = useQuery({
    queryKey: ["floristOrders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          profiles:customer_id (full_name),
          order_items (
            *,
            products (title)
          )
        `)
        .eq("florist_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("products").insert({
        florist_id: user?.id,
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
      });

      if (error) throw error;

      toast.success("Product added successfully!");
      setNewProduct({ title: "", description: "", price: "", category: "" });
      refetchProducts();
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Florist Dashboard</h1>
          <Button onClick={() => window.location.href = "/store-settings"}>
            Store Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${orders?.reduce((sum, order) => sum + Number(order.total_amount), 0).toFixed(2) || "0.00"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            {orders?.slice(0, 5).map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground">
                        From: {order.profiles?.full_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total_amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.products?.title} x{item.quantity}</span>
                        <span>${item.price_at_time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline">Update Status</Button>
                    <Button>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
        </div>
      </main>
    </div>
  );
};

export default FloristDashboard;