import { OrderStatus } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import { OrderStatusTracker } from "@/components/order/OrderStatusTracker";
import { OrderHeader } from "./OrderHeader";
import { OrderItemsList } from "./OrderItemsList";
import { OrderStatusActions } from "./OrderStatusActions";

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
        <OrderHeader 
          orderId={order.id}
          customerName={order.profiles?.full_name}
          totalAmount={order.total_amount}
          createdAt={order.created_at}
        />

        <OrderStatusTracker
          orderId={order.id}
          currentStatus={order.status as OrderStatus}
          onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)}
          className="mb-6"
        />

        <OrderItemsList items={order.order_items || []} />

        <OrderStatusActions 
          status={order.status}
          onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)}
        />
      </CardContent>
    </Card>
  );
};