import { Search, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          How it works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Browse & Select */}
          <Card className="bg-secondary border-none">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-[#D02D53] rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">Browse & Select</h3>
                <p className="text-muted-foreground">
                  Find the perfect flowers from local florists. Filter by occasion, budget, and delivery time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Place Your Order */}
          <Card className="bg-secondary border-none">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-[#D02D53] rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Choose your preferred size and add any special requests. Secure checkout with multiple payment options.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Get Your Flowers */}
          <Card className="bg-secondary border-none">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-[#D02D53] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">Get Your Flowers</h3>
                <p className="text-muted-foreground">
                  Your flowers will be crafted and delivered by local florists. Track your order in real-time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};