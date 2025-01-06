import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck } from "lucide-react";

interface FulfillmentToggleProps {
  fulfillmentType: "pickup" | "delivery";
  setFulfillmentType: (type: "pickup" | "delivery") => void;
}

export const FulfillmentToggle = ({ 
  fulfillmentType, 
  setFulfillmentType 
}: FulfillmentToggleProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Fulfillment Method</label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={fulfillmentType === "delivery" ? "default" : "secondary"}
          onClick={() => setFulfillmentType("delivery")}
          className={`flex items-center justify-center h-[42px] text-xs ${
            fulfillmentType === "delivery" 
              ? "bg-[#0071E3] hover:bg-[#0071E3]/90 text-white" 
              : ""
          }`}
        >
          <Truck className="w-3.5 h-3.5 mr-2" />
          Delivery
        </Button>
        <Button
          variant={fulfillmentType === "pickup" ? "default" : "secondary"}
          onClick={() => setFulfillmentType("pickup")}
          className={`flex items-center justify-center h-[42px] text-xs ${
            fulfillmentType === "pickup" 
              ? "bg-[#0071E3] hover:bg-[#0071E3]/90 text-white" 
              : ""
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-2" />
          Pickup
        </Button>
      </div>
    </div>
  );
};