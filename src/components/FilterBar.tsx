import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { TimeFilter } from "./filters/TimeFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { OccasionFilter } from "./filters/OccasionFilter";

interface FilterBarProps {
  initialFulfillmentType?: "pickup" | "delivery";
  initialDate?: Date;
  initialTime?: string | null;
  initialBudget?: number[];
  initialLocation?: string;
  onFilterChange?: (updates: Record<string, string>) => void;
}

export const FilterBar = ({ 
  initialFulfillmentType = "delivery",
  initialDate = undefined,
  initialTime = null,
  initialBudget = [500],
  initialLocation = "",
  onFilterChange
}: FilterBarProps) => {
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string | null>(initialTime);
  const [location, setLocation] = useState<string>(initialLocation);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">(initialFulfillmentType);

  useEffect(() => {
    if (onFilterChange) {
      const updates: Record<string, string> = {
        fulfillment: fulfillmentType,
        budget: budget[0].toString()
      };
      
      if (location) updates.location = location;
      if (date) updates.date = date.toISOString();
      if (time) updates.time = time;
      
      onFilterChange(updates);
    }
  }, [fulfillmentType, location, date, time, budget, onFilterChange]);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-medium">Fulfillment Method</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={fulfillmentType === "delivery" ? "default" : "outline"}
            onClick={() => setFulfillmentType("delivery")}
            className={`flex items-center justify-center h-[42px] text-xs border border-black rounded-lg ${
              fulfillmentType === "delivery" 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                : ''
            }`}
          >
            <Truck className="w-3.5 h-3.5 mr-2" />
            Delivery
          </Button>
          <Button
            variant={fulfillmentType === "pickup" ? "default" : "outline"}
            onClick={() => setFulfillmentType("pickup")}
            className={`flex items-center justify-center h-[42px] text-xs border border-black rounded-lg ${
              fulfillmentType === "pickup" 
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                : ''
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            Pickup
          </Button>
        </div>
      </div>
      
      <LocationFilter 
        location={location}
        setLocation={setLocation}
      />
      
      <DateFilter 
        date={date}
        setDate={setDate}
      />
      
      <TimeFilter 
        time={time}
        setTime={setTime}
      />
      
      <BudgetFilter 
        budget={budget}
        setBudget={setBudget}
      />
      
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <OccasionFilter 
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
      />
    </div>
  );
};