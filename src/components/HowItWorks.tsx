import { Truck, Search, CheckCircle } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 md:mb-16">
        How it works
      </h2>
      
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Step 1 */}
          <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-3">Find your florist</h3>
            <p className="text-muted-foreground mb-8">
              Browse local florists and their unique arrangements. Pick your favorites.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Search className="w-8 h-8 text-primary mb-3" />
              <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-muted rounded-full w-1/2" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-3">Place your order</h3>
            <p className="text-muted-foreground mb-8">
              Choose your perfect arrangement and select delivery or pickup options.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <div className="h-2 bg-muted rounded-full w-2/3 mb-2" />
              <div className="h-2 bg-muted rounded-full w-1/2" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-3">Enjoy delivery</h3>
            <p className="text-muted-foreground mb-8">
              Your flowers will be crafted and delivered with care right to your door.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-8 h-8 text-primary mb-3" />
              <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
              <div className="h-2 bg-muted rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};