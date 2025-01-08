import { ShieldCheck, Flower2, Users } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <div className="bg-[#eed2d8] rounded-lg p-6 mb-4 border border-black space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-6xl font-bold">
          Your City's Finest Florists
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover an exclusive network of local artisan florists, carefully selected for their exceptional creativity and reliability. All in one convenient marketplace.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <Users className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="text-xl font-semibold">Handpicked Talent</h3>
          <p className="text-sm text-muted-foreground">
            Every florist in our marketplace has been personally vetted for excellence.
          </p>
        </div>

        <div className="space-y-2">
          <ShieldCheck className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="text-xl font-semibold">Seamless Ordering</h3>
          <p className="text-sm text-muted-foreground">
            Shop with confidence knowing every order is backed by our guarantee.
          </p>
        </div>

        <div className="space-y-2">
          <Flower2 className="w-6 h-6 mx-auto text-gray-700" />
          <h3 className="text-xl font-semibold">Local Artistry</h3>
          <p className="text-sm text-muted-foreground">
            Experience unique designs from the most talented florists in your area.
          </p>
        </div>
      </div>
    </div>
  );
};