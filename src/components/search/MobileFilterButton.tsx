import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { useSearchParams } from "react-router-dom";

export const MobileFilterButton = () => {
  const [searchParams] = useSearchParams();

  // Get initial values from URL parameters
  const initialFulfillmentType = (searchParams.get('fulfillment') as "pickup" | "delivery") || "delivery";
  const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();
  const initialTime = searchParams.get('time') || null;
  const initialBudget = searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500];
  const initialLocation = searchParams.get('location') || "";

  return (
    <div className="lg:hidden mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full text-sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px]">
          <div className="w-full">
            <div>
              <h3 className="text-sm font-medium mb-3">Filters</h3>
              <FilterBar 
                initialFulfillmentType={initialFulfillmentType}
                initialDate={initialDate}
                initialTime={initialTime}
                initialBudget={initialBudget}
                initialLocation={initialLocation}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};