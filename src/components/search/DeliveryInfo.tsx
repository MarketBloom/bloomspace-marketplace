import { ShieldCheck, Flower2, Users } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-6 mb-4 border border-black space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium">
          ALL THE BEST IN ONE PLACE
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Your city's best florists, all in one place. We've handpicked local florists known for their exceptional arrangements and reliable service.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <Users className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">CURATED FLORISTS</h3>
          <p className="text-sm text-gray-600">
            Handpicked local florists, vetted for quality and reliability.
          </p>
        </div>

        <div className="space-y-2">
          <ShieldCheck className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">SECURE CHECKOUT</h3>
          <p className="text-sm text-gray-600">
            Safe and easy ordering with guaranteed satisfaction.
          </p>
        </div>

        <div className="space-y-2">
          <Flower2 className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="font-medium">ENDLESS OPTIONS</h3>
          <p className="text-sm text-gray-600">
            From classic bouquets to unique arrangements.
          </p>
        </div>
      </div>
    </div>
  );
};