import { AddProductForm } from "./AddProductForm";
import { ProductList } from "./ProductList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Package } from "lucide-react";

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
      <Accordion type="single" collapsible defaultValue="current-products">
        <AccordionItem value="add-product">
          <AccordionTrigger className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span>Add New Product</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <AddProductForm floristId={floristId} onProductAdded={refetch} />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="current-products">
          <AccordionTrigger className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>Current Products</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <ProductList products={products || []} onProductDeleted={refetch} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};