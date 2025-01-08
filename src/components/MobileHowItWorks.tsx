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
          {/* Local Florists */}
          <div className="bg-secondary rounded-2xl p-6 border border-[#eed2d8]">
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

          {/* Care & Support */}
          <div className="bg-secondary rounded-2xl p-6 border border-[#eed2d8]">
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

          {/* Easy Filters */}
          <div className="bg-secondary rounded-2xl p-6 border border-[#eed2d8]">
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

          {/* Delivery Options */}
          <div className="bg-secondary rounded-2xl p-6 border border-[#eed2d8]">
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