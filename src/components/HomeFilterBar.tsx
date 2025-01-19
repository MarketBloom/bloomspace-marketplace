import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./home-filters/LocationFilter";
import { DateFilter } from "./home-filters/DateFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
import { ShoppingBag, Truck } from "lucide-react";
import { ShineBorder } from "./ui/shine-border";
import { format } from "date-fns";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState<number[]>([500]);
  const [location, setLocation] = useState<string>("");

  const handleSearch = (fulfillmentType: "pickup" | "delivery") => {
    const searchParams = new URLSearchParams();
    
    if (location) searchParams.append("location", location);
    
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

    navigate({
      pathname: "/search",
      search: searchParams.toString()
    });
  };

  return (
    <ShineBorder 
      borderRadius={8}
      borderWidth={1}
      duration={14}
      color={["#D73459", "#eed2d8"]}
      className="w-full bg-[#eed2d8]/80 backdrop-blur-sm px-3 py-4 md:p-5 mt-0 md:mt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="space-y-1.5">
          <label className="text-foreground text-xs font-medium">Location</label>
          <LocationFilter 
            location={location}
            setLocation={setLocation}
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
      
      <div className="grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-4">
        <RainbowButton 
          onClick={() => handleSearch("delivery")}
          className="w-full text-xs md:text-sm h-[42px] px-2 md:px-8"
        >
          <Truck className="w-4 h-4 mr-1 md:mr-2" />
          Search Delivery
        </RainbowButton>
        <Button 
          className="bg-white hover:bg-white/90 text-black text-xs md:text-sm h-[42px] px-4 w-full rounded-lg border border-black"
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </ShineBorder>
  );
};