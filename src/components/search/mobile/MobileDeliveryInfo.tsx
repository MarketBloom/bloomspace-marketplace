import { Flower, Truck } from "lucide-react";

export const MobileDeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg border border-black p-3 mb-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <Flower className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Local Sourcing</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fresh flowers sourced directly from local growers and artisans.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <Truck className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">City Delivery</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Same-day delivery available across the city.
          </p>
        </div>
      </div>
    </div>
  );
};