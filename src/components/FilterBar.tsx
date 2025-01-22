import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { FulfillmentToggle } from "./filters/FulfillmentToggle";
import { Button } from "./ui/button";
import { format } from "date-fns";
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
  initialDate,
  initialBudget = [500],
  initialLocation = "",
  onFilterChange
}: FilterBarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [location, setLocation] = useState<string>(initialLocation);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">(initialFulfillmentType);
  const [isSearching, setIsSearching] = useState(false);

  const handleApplyFilters = () => {
    if (isSearching) return;
    
    setIsSearching(true);
    
    try {
      if (location && !coordinates) {
        toast({
          title: "Location Error",
          description: "Please enter a valid suburb or postcode",
          variant: "destructive"
        });
        return;
      }

      const updates: Record<string, string> = {};
      
      if (location && coordinates) {
        updates.location = location;
        updates.lat = coordinates[0].toString();
        updates.lng = coordinates[1].toString();
      }
      
      if (date) {
        const now = new Date();
        const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        
        if (isToday) {
          updates.date = now.toISOString();
        } else {
          updates.date = date.toISOString();
        }
      }
      
      updates.budget = budget[0].toString();
      updates.fulfillment = fulfillmentType;

      if (onFilterChange) {
        onFilterChange(updates);
      } else {
        const searchParams = new URLSearchParams(updates);
        navigate({
          pathname: "/search",
          search: searchParams.toString()
        });
      }

      toast({
        title: "Filters Applied",
        description: "Your search results have been updated"
      });
    } catch (error) {
      console.error("Filter error:", error);
      toast({
        title: "Filter Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-[#eed2d8]/70 rounded-2xl border border-black/10 shadow-sm p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-4">
          <LocationFilter 
            location={location}
            setLocation={setLocation}
            onCoordsChange={setCoordinates}
          />
        </div>
        
        <DateFilter 
          date={date} 
          setDate={setDate} 
        />
        
        <BudgetFilter 
          budget={budget} 
          setBudget={setBudget} 
        />
        
        <div className="col-span-1 md:col-span-2">
          <FulfillmentToggle
            fulfillmentType={fulfillmentType}
            setFulfillmentType={setFulfillmentType}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleApplyFilters}
        disabled={isSearching || !!(location && !coordinates)}
        className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black h-[42px]"
      >
        Search Flowers
      </Button>
    </div>
  );
};