import { Flower, Heart, Filter, Truck } from "lucide-react";

export const MobileHowItWorks = () => {
  return (
    <section className="py-8 mt-[208px] md:hidden">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Support local florists
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Connect with talented local artisans and get fresh flowers delivered
        </p>
        
        <div className="space-y-4">
          {/* Local Artisans */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Flower className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Local Artisans</h3>
                <p className="text-muted-foreground text-sm">
                  Support talented florists in your community crafting unique arrangements
                </p>
              </div>
            </div>
          </div>

          {/* Crafted with Care */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Crafted with Care</h3>
                <p className="text-muted-foreground text-sm">
                  Every arrangement is made with love and backed by our satisfaction guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Easy to Find */}
          <div className="bg-[#eed2d8] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <Filter className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Easy to Find</h3>
                <p className="text-muted-foreground text-sm">
                  Filter by occasion, style, and budget to find your perfect arrangement
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
                  Same-day delivery available for those last-minute moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};