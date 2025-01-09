import { Truck, Package, Clock, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feature() {
  return (
    <div className="w-full py-12 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Dashboard</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
                Manage Your Flower Business
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Everything you need to run your florist business efficiently in one place.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-muted rounded-lg h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col shadow-apple hover:shadow-apple-hover transition-shadow">
              <Package className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Manage Products</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Create and update your flower arrangements, manage inventory, and set pricing.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg aspect-square p-6 flex justify-between flex-col shadow-apple hover:shadow-apple-hover transition-shadow">
              <Truck className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Delivery Settings</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Configure your delivery zones, time slots, and special delivery options.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg aspect-square p-6 flex justify-between flex-col shadow-apple hover:shadow-apple-hover transition-shadow">
              <Clock className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Operating Hours</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Set your business hours and manage availability for orders.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col shadow-apple hover:shadow-apple-hover transition-shadow">
              <DollarSign className="w-8 h-8 stroke-1 text-primary" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Orders & Revenue</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Track your orders, manage fulfillment, and monitor your business performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };