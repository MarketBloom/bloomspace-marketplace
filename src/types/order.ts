export interface OrderItemsTable {
  Row: {
    id: string;
    order_id: string | null;
    product_id: string | null;
    quantity: number;
    price_at_time: number;
    created_at: string;
  };
  Insert: {
    id?: string;
    order_id?: string | null;
    product_id?: string | null;
    quantity: number;
    price_at_time: number;
    created_at?: string;
  };
  Update: Partial<OrderItemsTable['Insert']>;
}

export interface OrdersTable {
  Row: {
    id: string;
    customer_id: string | null;
    florist_id: string | null;
    status: OrderStatus;
    total_amount: number;
    commission_amount: number;
    delivery_address: string | null;
    delivery_time: string | null;
    is_delivery: boolean | null;
    stripe_payment_id: string | null;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    customer_id?: string | null;
    florist_id?: string | null;
    status?: OrderStatus;
    total_amount: number;
    commission_amount: number;
    delivery_address?: string | null;
    delivery_time?: string | null;
    is_delivery?: boolean | null;
    stripe_payment_id?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Update: Partial<OrdersTable['Insert']>;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'delayed';

interface OrderStatusConfig {
  status: OrderStatus;
  label: string;
  description: string;
  color: string;
}

export const ORDER_STATUSES: OrderStatusConfig[] = [
  {
    status: 'pending',
    label: 'Order Placed',
    description: 'Your order has been received',
    color: 'bg-gray-500'
  },
  {
    status: 'confirmed',
    label: 'Confirmed',
    description: 'Order confirmed by florist',
    color: 'bg-blue-500'
  },
  {
    status: 'preparing',
    label: 'Preparing',
    description: 'Your flowers are being prepared',
    color: 'bg-yellow-500'
  },
  {
    status: 'out_for_delivery',
    label: 'Out for Delivery',
    description: 'Your order is on its way',
    color: 'bg-purple-500'
  },
  {
    status: 'delayed',
    label: 'Delayed',
    description: 'Delivery is experiencing delays',
    color: 'bg-orange-500'
  },
  {
    status: 'delivered',
    label: 'Delivered',
    description: 'Order has been delivered',
    color: 'bg-green-500'
  },
  {
    status: 'cancelled',
    label: 'Cancelled',
    description: 'Order has been cancelled',
    color: 'bg-red-500'
  }
];
