import { Truck, Clock, Calendar } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <div className="w-full bg-[#eed2d8] rounded-lg p-6 mb-6 border border-black">
      <h2 className="text-2xl font-medium text-center mb-4">SHOP FLOWERS</h2>
      
      <p className="text-center text-muted-foreground mb-12 max-w-4xl mx-auto">
        We source our flowers only from local and ethical growers. Creating thoughtful bouquets for 
        our community and beyond. We offer delivery of flowers across the city and curation of flower 
        design for corporate, wholesale, weddings and events. We believe in using seasonal, beautiful 
        botanicals to create unique bouquets for any occasion.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 mb-4 flex items-center justify-center">
            <Truck className="h-8 w-8" />
          </div>
          <h3 className="font-medium mb-2">DELIVERY ZONES</h3>
          <p className="text-muted-foreground">
            Available in your local area and surrounding regions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 mb-4 flex items-center justify-center">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="font-medium mb-2">SAME-DAY DELIVERY</h3>
          <p className="text-muted-foreground">
            Order before 1pm
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 mb-4 flex items-center justify-center">
            <Calendar className="h-8 w-8" />
          </div>
          <h3 className="font-medium mb-2">MON-SAT</h3>
          <p className="text-muted-foreground">
            Sunday orders will be delivered Monday.
          </p>
        </div>
      </div>
    </div>
  );
};