import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./home-filters/LocationFilter";
import { DateFilter } from "./home-filters/DateFilter";
import { TimeFilter } from "./home-filters/TimeFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { Button } from "./ui/button";
import { ShoppingBag, Truck } from "lucide-react";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [budget, setBudget] = useState<number[]>([500]);
  const [location, setLocation] = useState<string>("");

  const handleSearch = (fulfillmentType: "pickup" | "delivery") => {
    const searchParams = new URLSearchParams();
    
    // Add all filter parameters
    searchParams.append("fulfillment", fulfillmentType);
    if (location) searchParams.append("location", location);
    if (date) searchParams.append("date", date.toISOString());
    if (time) searchParams.append("time", time);
    searchParams.append("budget", budget[0].toString());

    // Navigate to search page with parameters
    navigate({
      pathname: "/search",
      search: searchParams.toString()
    });
  };

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10">
      <div className="grid grid-cols-1 gap-3 md:gap-4 mb-3 md:mb-4">
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
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Button 
          className="bg-[#E3E2E2] hover:bg-[#E3E2E2]/90 text-black text-xs md:text-sm h-9 md:h-11 px-3 md:px-4 w-full"
          onClick={() => handleSearch("delivery")}
        >
          <Truck className="w-4 h-4 mr-2" />
          Search Delivery
        </Button>
        <Button 
          className="bg-[#E3E2E2] hover:bg-[#E3E2E2]/90 text-black text-xs md:text-sm h-9 md:h-11 px-3 md:px-4 w-full"
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </div>
  );
};