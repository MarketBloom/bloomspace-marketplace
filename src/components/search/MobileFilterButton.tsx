import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MobileFilterButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL parameters
  const initialFulfillmentType = (searchParams.get('fulfillment') as "pickup" | "delivery") || "delivery";
  const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();
  const initialBudget = searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500];
  const initialLocation = searchParams.get('location') || "";

  const handleFilterChange = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <div className="lg:hidden mb-4 relative z-[60]">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full text-sm bg-white hover:bg-white/90 text-black h-11 px-4 rounded-lg border border-black"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <ScrollArea className="h-full px-4">
            <div className="py-6">
              <h3 className="text-sm font-medium mb-3">Filters</h3>
              <FilterBar 
                initialFulfillmentType={initialFulfillmentType}
                initialDate={initialDate}
                initialBudget={initialBudget}
                initialLocation={initialLocation}
                onFilterChange={handleFilterChange}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};