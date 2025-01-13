import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusTracker } from "@/components/order/OrderStatusTracker";
import { OrderStatus } from "@/types/order";
import { toast } from "sonner";

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
      return data;
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
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Orders</h2>
      </div>

      {orders?.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                <p className="text-sm text-muted-foreground">
                  From: {order.profiles?.full_name || 'Anonymous'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total_amount}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <OrderStatusTracker
              orderId={order.id}
              currentStatus={order.status as OrderStatus}
              onStatusChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
              className="mb-6"
            />

            <div className="space-y-2">
              {order.order_items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.products?.title} × {item.quantity}</span>
                  <span>${item.price_at_time}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <>
                  {order.status === "pending" && (
                    <Button 
                      variant="outline" 
                      onClick={() => updateOrderStatus(order.id, "confirmed")}
                    >
                      Confirm Order
                    </Button>
                  )}
                  {order.status === "confirmed" && (
                    <Button 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, "out_for_delivery")}
                    >
                      Mark as Out for Delivery
                    </Button>
                  )}
                  {order.status === "out_for_delivery" && (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        Mark as Delivered
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "delayed")}
                      >
                        Mark as Delayed
                      </Button>
                    </>
                  )}
                  {order.status === "delayed" && (
                    <Button 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, "out_for_delivery")}
                    >
                      Resume Delivery
                    </Button>
                  )}
                  <Button 
                    variant="destructive"
                    onClick={() => updateOrderStatus(order.id, "cancelled")}
                  >
                    Cancel Order
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};