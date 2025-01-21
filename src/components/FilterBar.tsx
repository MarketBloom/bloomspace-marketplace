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
      // Only proceed with search if we have both location and coordinates when location is entered
      if (location && !coordinates) {
        toast({
          title: "Location Error",
          description: "Please enter a valid suburb or postcode",
          variant: "destructive"
        });
        return;
      }

      const updates: Record<string, string> = {};
      
      // Only include location params if we have both location text and coordinates
      if (location && coordinates) {
        updates.location = location;
        updates.lat = coordinates[0].toString();
        updates.lng = coordinates[1].toString();
      }
      
      // If date is today, also include the current time to filter by cutoff
      if (date) {
        const now = new Date();
        const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        
        if (isToday) {
          // Include current time for same-day filtering
          updates.date = now.toISOString();
        } else {
          // For future dates, just include the date
          updates.date = date.toISOString();
        }
      }
      
      updates.budget = budget[0].toString();
      updates.fulfillment = fulfillmentType;

      if (onFilterChange) {
        onFilterChange(updates);
      } else {
        // If no onFilterChange provided, navigate to search page
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <LocationFilter 
          location={location}
          setLocation={setLocation}
          onCoordsChange={setCoordinates}
        />
        
        <DateFilter 
          date={date} 
          setDate={setDate} 
        />
        
        <BudgetFilter 
          budget={budget} 
          setBudget={setBudget} 
        />
        
        <FulfillmentToggle
          fulfillmentType={fulfillmentType}
          setFulfillmentType={setFulfillmentType}
        />
      </div>
      
      <Button 
        onClick={handleApplyFilters}
        disabled={isSearching || !!(location && !coordinates)}
        className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black"
      >
        Apply Filters
      </Button>
    </div>
  );
};