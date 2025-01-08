import { Truck, Clock, CalendarDays } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-6 mb-4 border border-black space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium">
          SHOP FLOWERS
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Your city's best florists, all in one place. We've handpicked local florists known for their exceptional arrangements and reliable service, making it easy to find and order from trusted professionals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <Truck className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">DELIVERY ZONES</h3>
          <p className="text-sm text-gray-600">
            Available in your local area and surrounding regions.
          </p>
        </div>

        <div className="space-y-2">
          <Clock className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">SAME-DAY DELIVERY</h3>
          <p className="text-sm text-gray-600">
            Order before 1pm
          </p>
        </div>

        <div className="space-y-2">
          <CalendarDays className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">MON-SAT</h3>
          <p className="text-sm text-gray-600">
            Sunday orders will be delivered Monday.
          </p>
        </div>
      </div>
    </div>
  );
};