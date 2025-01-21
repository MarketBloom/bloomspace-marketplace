import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { OccasionFilter } from "./filters/OccasionFilter";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [location, setLocation] = useState<string>(initialLocation);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(["All"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">(initialFulfillmentType);
  const [isApplying, setIsApplying] = useState(false);

  // Track if user has modified filters
  const [hasModifiedLocation, setHasModifiedLocation] = useState(false);
  const [hasModifiedDate, setHasModifiedDate] = useState(false);
  const [hasModifiedBudget, setHasModifiedBudget] = useState(false);

  const handleApplyFilters = () => {
    if (isApplying) return;
    
    setIsApplying(true);
    
    try {
      if (onFilterChange) {
        const updates: Record<string, string> = {
          fulfillment: fulfillmentType,
        };

        // Only include modified filters
        if (hasModifiedBudget || initialBudget[0] !== 500) {
          updates.budget = budget[0].toString();
        }
        
        if (hasModifiedLocation || initialLocation) {
          updates.location = location;
        }

        if (hasModifiedDate && date) {
          updates.date = date.toISOString();
        }
        
        // Always include categories and occasions
        updates.categories = selectedCategories.includes("All") ? "all" : selectedCategories.join(',');
        updates.occasions = selectedOccasions.includes("All") ? "all" : selectedOccasions.join(',');
        
        onFilterChange(updates);
        
        toast({
          title: "Filters Applied",
          description: "Your search results have been updated"
        });
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      toast({
        title: "Error",
        description: "Failed to apply filters. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setHasModifiedLocation(true);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setHasModifiedDate(true);
  };

  const handleBudgetChange = (newBudget: number[]) => {
    setBudget(newBudget);
    setHasModifiedBudget(true);
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
        setLocation={handleLocationChange}
      />
      
      <DateFilter 
        date={date}
        setDate={handleDateChange}
      />
      
      <BudgetFilter 
        budget={budget}
        setBudget={handleBudgetChange}
      />
      
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <OccasionFilter 
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
      />

      <Button
        onClick={handleApplyFilters}
        disabled={isApplying}
        className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black"
      >
        <Search className="w-4 h-4 mr-2" />
        {isApplying ? "Applying..." : "Apply Filters"}
      </Button>
    </div>
  );
};