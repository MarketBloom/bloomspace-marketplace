import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  products: { title: string };
  quantity: number;
  price_at_time: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  profiles: { full_name: string };
  order_items: OrderItem[];
}

interface RecentOrdersProps {
  orders: Order[];
}

export const RecentOrders = ({ orders }: RecentOrdersProps) => {
  return (
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
  );
};