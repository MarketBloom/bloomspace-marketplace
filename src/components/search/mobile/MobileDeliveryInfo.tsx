import { ShieldCheck, Flower2, Users } from "lucide-react";

export const MobileDeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-4 mb-4 border border-black space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">
          YOUR CITY'S FINEST FLORISTS
        </h2>
        <p className="text-sm text-gray-600">
          Discover an exclusive network of local artisan florists, carefully selected for their exceptional creativity.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">HANDPICKED TALENT</h3>
            <p className="text-xs text-gray-600">
              Every florist in our marketplace has been personally vetted for excellence.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">SEAMLESS ORDERING</h3>
            <p className="text-xs text-gray-600">
              Shop with confidence knowing every order is backed by our guarantee.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Flower2 className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm">LOCAL ARTISTRY</h3>
            <p className="text-xs text-gray-600">
              Experience unique designs from the most talented florists in your area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};