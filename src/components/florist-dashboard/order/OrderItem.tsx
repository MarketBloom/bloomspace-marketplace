import { OrderStatus } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusTracker } from "@/components/order/OrderStatusTracker";

interface OrderItemProps {
  order: {
    id: string;
    status: OrderStatus;
    total_amount: number;
    created_at: string;
    profiles?: { full_name: string | null };
    order_items?: {
      id: string;
      products?: { title: string | null };
      quantity: number;
      price_at_time: number;
    }[];
  };
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderItem = ({ order, onStatusChange }: OrderItemProps) => {
  return (
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
          onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)}
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
                  onClick={() => onStatusChange(order.id, "confirmed")}
                >
                  Confirm Order
                </Button>
              )}
              {order.status === "confirmed" && (
                <Button 
                  variant="outline"
                  onClick={() => onStatusChange(order.id, "preparing")}
                >
                  Start Preparing
                </Button>
              )}
              {order.status === "preparing" && (
                <Button 
                  variant="outline"
                  onClick={() => onStatusChange(order.id, "out_for_delivery")}
                >
                  Mark as Out for Delivery
                </Button>
              )}
              {order.status === "out_for_delivery" && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => onStatusChange(order.id, "delivered")}
                  >
                    Mark as Delivered
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onStatusChange(order.id, "delayed")}
                  >
                    Mark as Delayed
                  </Button>
                </>
              )}
              {order.status === "delayed" && (
                <Button 
                  variant="outline"
                  onClick={() => onStatusChange(order.id, "out_for_delivery")}
                >
                  Resume Delivery
                </Button>
              )}
              <Button 
                variant="destructive"
                onClick={() => onStatusChange(order.id, "cancelled")}
              >
                Cancel Order
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};