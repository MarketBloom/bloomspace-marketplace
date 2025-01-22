interface OrderItemsListProps {
  items: {
    id: string;
    products?: { title: string | null };
    quantity: number;
    price_at_time: number;
  }[];
}

export const OrderItemsList = ({ items }: OrderItemsListProps) => {
  return (
    <div className="space-y-2">
      {items?.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span>{item.products?.title} × {item.quantity}</span>
          <span>${item.price_at_time}</span>
        </div>
      ))}
    </div>
  );
};