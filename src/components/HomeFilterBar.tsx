import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateFilter } from "./home-filters/DateFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
import { ShoppingBag, Truck } from "lucide-react";
import { ShineBorder } from "./ui/shine-border";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { LocationFilter } from "./filters/LocationFilter";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState<number[]>([500]);
  const [location, setLocation] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (fulfillmentType: "pickup" | "delivery") => {
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

      const searchParams = new URLSearchParams();
      
      // Only include location params if we have both location text and coordinates
      if (location && coordinates) {
        searchParams.append("location", location);
        searchParams.append("lat", coordinates[0].toString());
        searchParams.append("lng", coordinates[1].toString());
      }
      
      // If date is today, also include the current time to filter by cutoff
      if (date) {
        const now = new Date();
        const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        
        if (isToday) {
          // Include current time for same-day filtering
          searchParams.append("date", now.toISOString());
        } else {
          // For future dates, just include the date
          searchParams.append("date", date.toISOString());
        }
      }
      
      searchParams.append("budget", budget[0].toString());
      searchParams.append("fulfillment", fulfillmentType);

      toast({
        title: "Searching...",
        description: "Finding the perfect flowers for you"
      });

      navigate({
        pathname: "/search",
        search: searchParams.toString()
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <ShineBorder 
      borderRadius={8}
      borderWidth={1}
      duration={14}
      color={["#D73459", "#eed2d8"]}
      className="w-full bg-[#eed2d8]/80 backdrop-blur-sm px-3 py-4 md:p-5 mt-0 md:mt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-foreground text-xs font-medium">Location</label>
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
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RainbowButton 
          onClick={() => handleSearch("delivery")}
          className="w-full text-sm h-[42px]"
          disabled={isSearching || !!(location && !coordinates)}
        >
          <Truck className="w-4 h-4 mr-2" />
          Search Delivery
        </RainbowButton>
        <Button 
          className="bg-white hover:bg-white/90 text-black text-sm h-[42px] w-full rounded-lg border border-black"
          onClick={() => handleSearch("pickup")}
          disabled={isSearching || !!(location && !coordinates)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </ShineBorder>
  );
};