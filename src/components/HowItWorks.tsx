import { Flower, Heart, Filter, Truck, Gift } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Support local florists
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-[800px] mx-auto mb-8 md:mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
          Connect with talented local artisans and get fresh flowers delivered when you need them
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Local Florists */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <div className="aspect-[4/5]">
              <h3 className="text-xl font-semibold mb-3">Local Artisans</h3>
              <p className="text-muted-foreground mb-8">
                Support talented florists in your community crafting unique arrangements
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Flower className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Care & Support */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <div className="aspect-[4/5]">
              <h3 className="text-xl font-semibold mb-3">Crafted with Care</h3>
              <p className="text-muted-foreground mb-8">
                Every arrangement is made with love and backed by our satisfaction guarantee
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-2/3 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Easy Filters */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <div className="aspect-[4/5]">
              <h3 className="text-xl font-semibold mb-3">Easy to Find</h3>
              <p className="text-muted-foreground mb-8">
                Filter by occasion, style, and budget to find your perfect arrangement
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Filter className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <div className="aspect-[4/5]">
              <h3 className="text-xl font-semibold mb-3">Quick Delivery</h3>
              <p className="text-muted-foreground mb-8">
                Same-day delivery available for those last-minute moments
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Truck className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>

          {/* Perfect Gifts */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <div className="aspect-[4/5]">
              <h3 className="text-xl font-semibold mb-3">Perfect Gifts</h3>
              <p className="text-muted-foreground mb-8">
                Find the ideal floral gift for any special occasion or celebration
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Gift className="w-8 h-8 text-primary mb-3" />
                <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};