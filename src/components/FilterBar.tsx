import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { OccasionFilter } from "./filters/OccasionFilter";

interface FilterBarProps {
  initialFulfillmentType?: "pickup" | "delivery";
  initialDate?: Date;
  initialBudget?: number[];
  initialLocation?: string;
  onFilterChange?: (updates: Record<string, string>) => void;
}

export const FilterBar = ({ 
  initialFulfillmentType = "delivery",
  initialDate = undefined,
  initialBudget = [500],
  initialLocation = "",
  onFilterChange
}: FilterBarProps) => {
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [location, setLocation] = useState<string>(initialLocation);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">(initialFulfillmentType);
  const [hasInteractedWithOccasions, setHasInteractedWithOccasions] = useState(false);
  const [hasInteractedWithCategories, setHasInteractedWithCategories] = useState(false);

  useEffect(() => {
    if (onFilterChange) {
      const updates: Record<string, string> = {
        fulfillment: fulfillmentType,
        budget: budget[0].toString()
      };
      
      if (location) updates.location = location;
      if (date) updates.date = date.toISOString();
      
      // Only include occasions and categories if they've been interacted with
      if (hasInteractedWithOccasions && selectedOccasions.length > 0) {
        updates.occasions = selectedOccasions.join(',');
      }
      if (hasInteractedWithCategories && selectedCategories.length > 0) {
        updates.categories = selectedCategories.join(',');
      }
      
      onFilterChange(updates);
    }
  }, [
    fulfillmentType, 
    location, 
    date, 
    budget, 
    selectedOccasions,
    selectedCategories,
    hasInteractedWithOccasions,
    hasInteractedWithCategories,
    onFilterChange
  ]);

  const handleOccasionsChange = (occasions: string[]) => {
    setHasInteractedWithOccasions(true);
    setSelectedOccasions(occasions);
  };

  const handleCategoriesChange = (categories: string[]) => {
    setHasInteractedWithCategories(true);
    setSelectedCategories(categories);
  };

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
      
      <BudgetFilter 
        budget={budget}
        setBudget={setBudget}
      />
      
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={handleCategoriesChange}
      />
      
      <OccasionFilter 
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={handleOccasionsChange}
      />
    </div>
  );
};