export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderStatusInfo {
  status: OrderStatus;
  label: string;
  description: string;
  color: string;
}

export const ORDER_STATUSES: Record<OrderStatus, OrderStatusInfo> = {
  pending: {
    status: "pending",
    label: "Pending",
    description: "Order received, waiting for florist confirmation",
    color: "bg-yellow-500"
  },
  confirmed: {
    status: "confirmed",
    label: "Confirmed",
    description: "Order confirmed by florist",
    color: "bg-blue-500"
  },
  preparing: {
    status: "preparing",
    label: "Preparing",
    description: "Your order is being prepared",
    color: "bg-purple-500"
  },
  out_for_delivery: {
    status: "out_for_delivery",
    label: "Out for Delivery",
    description: "Your order is on its way",
    color: "bg-indigo-500"
  },
  delivered: {
    status: "delivered",
    label: "Delivered",
    description: "Order has been delivered",
    color: "bg-green-500"
  },
  cancelled: {
    status: "cancelled",
    label: "Cancelled",
    description: "Order has been cancelled",
    color: "bg-red-500"
  }
};