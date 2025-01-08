import { Truck, Clock, CalendarDays } from "lucide-react";

export const MobileDeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-4 mb-4 border border-black space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">
          SHOP FLOWERS
        </h2>
        <p className="text-sm text-gray-600">
          Your city's best florists, all in one place. We've handpicked local florists known for their exceptional arrangements and reliable service.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">DELIVERY ZONES</h3>
            <p className="text-xs text-gray-600">
              Available in your local area and surrounding regions.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">SAME-DAY DELIVERY</h3>
            <p className="text-xs text-gray-600">
              Order before 1pm
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <CalendarDays className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">MON-SAT</h3>
            <p className="text-xs text-gray-600">
              Sunday orders will be delivered Monday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};