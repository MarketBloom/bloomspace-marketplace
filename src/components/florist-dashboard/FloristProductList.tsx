import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FloristProductListProps {
  floristId: string;
}

export const FloristProductList = ({ floristId }: FloristProductListProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: products, refetch } = useQuery({
    queryKey: ["floristProducts", floristId, sortOrder],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_sizes (
            id,
            name,
            price,
            images
          )
        `)
        .eq("florist_id", floristId)
        .order("created_at", { ascending: sortOrder === 'asc' });

      if (error) throw error;
      return data;
    },
  });

  const toggleProductVisibility = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_hidden: !currentStatus })
        .eq("id", productId);

      if (error) throw error;

      toast.success("Product visibility updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update product visibility");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by Date
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOrder('desc')}>
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder('asc')}>
              Oldest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="group relative">
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              images={product.images}
              floristId={floristId}
              displayPrice={product.price}
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Switch
                checked={!product.is_hidden}
                onCheckedChange={() => toggleProductVisibility(product.id, !product.is_hidden)}
              />
            </div>
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">No products yet</h2>
          <p className="text-muted-foreground">
            Start adding products to your store
          </p>
        </div>
      )}
    </div>
  );
};