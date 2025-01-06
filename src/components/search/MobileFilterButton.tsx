import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MobileFilterButton = () => {
  const [searchParams] = useSearchParams();

  const initialFulfillmentType = (searchParams.get('fulfillment') as "pickup" | "delivery") || "delivery";
  const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();
  const initialTime = searchParams.get('time') || null;
  const initialBudget = searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500];
  const initialLocation = searchParams.get('location') || "";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full text-sm bg-white hover:bg-white/90 border-gray-200 shadow-sm h-10"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[300px] p-0">
        <ScrollArea className="h-full px-4">
          <div className="py-6">
            <h3 className="text-base font-medium mb-4">Filters</h3>
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
  );
};