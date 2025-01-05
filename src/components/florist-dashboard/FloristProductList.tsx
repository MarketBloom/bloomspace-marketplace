import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const FloristProductList = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: products, isLoading } = useQuery({
    queryKey: ['florist-products'],
    queryFn: async () => {
      const { data: floristId } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles!inner (
            store_name,
            delivery_cutoff,
            delivery_start_time,
            delivery_end_time
          ),
          product_sizes (
            id,
            name,
            price_adjustment,
            images,
            is_default
          )
        `)
        .eq('florist_id', floristId.user?.id)
        .order('created_at', { ascending: sortOrder === 'asc' });

      if (error) throw error;

      // Transform products to include size variants
      return data.map(product => {
        const defaultSize = product.product_sizes?.find(size => size.is_default) || product.product_sizes?.[0];
        
        return {
          ...product,
          id: product.id,
          title: product.title,
          price: product.price,
          displayPrice: product.price + (defaultSize?.price_adjustment || 0),
          displaySize: defaultSize?.name,
          sizeId: defaultSize?.id,
          images: defaultSize?.images?.length ? defaultSize.images : product.images,
          floristName: product.florist_profiles.store_name,
          floristId: product.florist_id,
          isDeliveryAvailable: true,
          isPickupAvailable: true,
          deliveryCutoff: product.florist_profiles.delivery_cutoff,
          pickupCutoff: product.florist_profiles.delivery_end_time
        };
      });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by Date
          </Button>
          <Button 
            onClick={() => navigate('/dashboard/products/new')}
            className="bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard {...product} />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
              >
                Edit Product
              </Button>
            </div>
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found. Add your first product to get started!</p>
        </div>
      )}
    </div>
  );
};