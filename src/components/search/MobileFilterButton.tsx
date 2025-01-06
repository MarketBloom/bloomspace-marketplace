import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MobileFilterButton = () => {
  const [searchParams] = useSearchParams();

  // Get initial values from URL parameters
  const initialFulfillmentType = (searchParams.get('fulfillment') as "pickup" | "delivery") || "delivery";
  const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();
  const initialTime = searchParams.get('time') || null;
  const initialBudget = searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500];
  const initialLocation = searchParams.get('location') || "";

  return (
    <div className="lg:hidden mb-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full text-sm bg-secondary hover:bg-secondary/80 border-black/20"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0 border-r border-black/20">
          <ScrollArea className="h-full px-3">
            <div className="py-4">
              <h3 className="text-sm font-medium mb-2">Filters</h3>
              <FilterBar 
                initialFulfillmentType={initialFulfillmentType}
                initialDate={initialDate}
                initialTime={initialTime}
                initialBudget={initialBudget}
                initialLocation={initialLocation}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};