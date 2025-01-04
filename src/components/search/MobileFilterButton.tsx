import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";

export const MobileFilterButton = () => {
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
              <FilterBar />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};