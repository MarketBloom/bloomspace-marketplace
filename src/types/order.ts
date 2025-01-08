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
    status: string | null;
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
    status?: string | null;
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