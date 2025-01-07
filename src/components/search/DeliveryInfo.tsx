import { Truck, Clock, Calendar } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <div className="w-full bg-[#eed2d8] rounded-lg p-4 mb-4 border border-black">
      <h2 className="text-xl font-medium text-center mb-2">SHOP FLOWERS</h2>
      
      <p className="text-center text-muted-foreground mb-6 max-w-4xl mx-auto text-sm">
        We source our flowers from local and ethical growers, creating thoughtful bouquets for 
        our community. We offer delivery across the city and curation for corporate, wholesale, 
        weddings and events.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center">
          <div className="h-8 w-8 mb-2 flex items-center justify-center">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="font-medium mb-1 text-sm">DELIVERY ZONES</h3>
          <p className="text-muted-foreground text-xs">
            Available in your local area and surrounding regions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="h-8 w-8 mb-2 flex items-center justify-center">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="font-medium mb-1 text-sm">SAME-DAY DELIVERY</h3>
          <p className="text-muted-foreground text-xs">
            Order before 1pm
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="h-8 w-8 mb-2 flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="font-medium mb-1 text-sm">MON-SAT</h3>
          <p className="text-muted-foreground text-xs">
            Sunday orders will be delivered Monday.
          </p>
        </div>
      </div>
    </div>
  );
};