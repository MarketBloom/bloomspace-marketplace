import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/types/order";

interface OrderStatusActionsProps {
  status: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => void;
}

export const OrderStatusActions = ({ status, onStatusChange }: OrderStatusActionsProps) => {
  // Early return if status is final (cancelled or delivered)
  if (status === "cancelled" || status === "delivered") {
    return null;
  }

  return (
    <div className="mt-4 flex justify-end space-x-2">
      {status === "pending" && (
        <Button 
          variant="outline" 
          onClick={() => onStatusChange("confirmed")}
        >
          Confirm Order
        </Button>
      )}
      {status === "confirmed" && (
        <Button 
          variant="outline"
          onClick={() => onStatusChange("preparing")}
        >
          Start Preparing
        </Button>
      )}
      {status === "preparing" && (
        <Button 
          variant="outline"
          onClick={() => onStatusChange("out_for_delivery")}
        >
          Mark as Out for Delivery
        </Button>
      )}
      {status === "out_for_delivery" && (
        <>
          <Button 
            variant="outline"
            onClick={() => onStatusChange("delivered")}
          >
            Mark as Delivered
          </Button>
          <Button 
            variant="outline"
            onClick={() => onStatusChange("delayed")}
          >
            Mark as Delayed
          </Button>
        </>
      )}
      {status === "delayed" && (
        <Button 
          variant="outline"
          onClick={() => onStatusChange("out_for_delivery")}
        >
          Resume Delivery
        </Button>
      )}
      {/* Show cancel button for all non-final statuses */}
      <Button 
        variant="destructive"
        onClick={() => onStatusChange("cancelled")}
      >
        Cancel Order
      </Button>
    </div>
  );
};