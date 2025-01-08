import { ShieldCheck, Flower2, Users } from "lucide-react";

export const MobileDeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-4 mb-4 border border-black space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">
          ALL THE BEST IN ONE PLACE
        </h2>
        <p className="text-sm text-gray-600">
          Your city's best florists, all in one place. We've handpicked local florists known for their exceptional arrangements.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">CURATED FLORISTS</h3>
            <p className="text-xs text-gray-600">
              Handpicked local florists, vetted for quality and reliability.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">SECURE CHECKOUT</h3>
            <p className="text-xs text-gray-600">
              Safe and easy ordering with guaranteed satisfaction.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Flower2 className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">ENDLESS OPTIONS</h3>
            <p className="text-xs text-gray-600">
              From classic bouquets to unique arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};