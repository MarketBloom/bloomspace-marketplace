import { AddProductForm } from "./AddProductForm";
import { ProductList } from "./ProductList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ProductManagementProps {
  floristId: string;
}

export const ProductManagement = ({ floristId }: ProductManagementProps) => {
  const { data: products, refetch } = useQuery({
    queryKey: ["floristProducts", floristId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_sizes (
            id,
            name,
            price_adjustment,
            is_default
          )
        `)
        .eq("florist_id", floristId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to include the actual price for each size
      return data.map((product: any) => ({
        ...product,
        product_sizes: product.product_sizes?.map((size: any) => ({
          id: size.id,
          name: size.name,
          price: product.price + size.price_adjustment,
          isDefault: size.is_default
        }))
      }));
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Add New Product</h2>
      <AddProductForm floristId={floristId} onProductAdded={refetch} />

      <h2 className="text-2xl font-semibold">Current Products</h2>
      <ProductList products={products || []} onProductDeleted={refetch} />
    </div>
  );
};