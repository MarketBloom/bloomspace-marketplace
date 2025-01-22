interface OrderHeaderProps {
  orderId: string;
  customerName: string | null;
  totalAmount: number;
  createdAt: string;
}

export const OrderHeader = ({ orderId, customerName, totalAmount, createdAt }: OrderHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="font-semibold">Order #{orderId.slice(0, 8)}</h3>
        <p className="text-sm text-muted-foreground">
          From: {customerName || 'Anonymous'}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold">${totalAmount}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};