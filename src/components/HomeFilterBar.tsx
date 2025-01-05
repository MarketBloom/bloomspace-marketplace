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
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-5 border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-2">
          <LocationFilter 
            location={location}
            setLocation={setLocation}
          />
        </div>
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
        <div className="flex gap-2">
          <Button 
            className="bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black text-xs h-9 px-3 flex-1"
            onClick={() => handleSearch("delivery")}
          >
            <Truck className="w-3.5 h-3.5 mr-1" />
            Delivery
          </Button>
          <Button 
            className="bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black text-xs h-9 px-3 flex-1"
            onClick={() => handleSearch("pickup")}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1" />
            Pickup
          </Button>
        </div>
      </div>
    </div>
  );
};