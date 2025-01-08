import { Flower, Heart, Filter, Truck } from "lucide-react";

export const MobileHowItWorks = () => {
  return (
    <section className="py-8 mt-[208px] md:hidden">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Your city's best florists
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Discover our handpicked selection of exceptional local florists
        </p>
        
        <div className="space-y-4">
          {/* Local Excellence */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Flower className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Local Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Support the finest florists in your community creating stunning arrangements
                </p>
              </div>
            </div>
          </div>

          {/* Quality Guaranteed */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-muted-foreground text-sm">
                  Every arrangement is crafted with care and backed by our satisfaction guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Simple Shopping */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Filter className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Simple Shopping</h3>
                <p className="text-muted-foreground text-sm">
                  Find your perfect arrangement by occasion, style, and budget
                </p>
              </div>
            </div>
          </div>

          {/* Quick Delivery */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Quick Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Same-day delivery available for those special moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};