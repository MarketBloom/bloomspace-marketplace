import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OrderStatus } from "@/types/order";
import { toast } from "sonner";
import { OrderItem } from "./order/OrderItem";
import { OrderSkeleton } from "./order/OrderSkeleton";

interface OrderManagementProps {
  floristId: string;
}

export const OrderManagement = ({ floristId }: OrderManagementProps) => {
  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['florist-orders', floristId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:customer_id (full_name),
          order_items (
            *,
            products (title)
          )
        `)
        .eq('florist_id', floristId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(order => ({
        ...order,
        status: order.status as OrderStatus // Type assertion here
      }));
    },
    enabled: !!floristId,
  });

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <OrderSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Orders</h2>
      </div>

      {orders?.map((order) => (
        <OrderItem 
          key={order.id} 
          order={order} 
          onStatusChange={updateOrderStatus}
        />
      ))}
    </div>
  );
};