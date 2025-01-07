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
    
    if (location) searchParams.append("location", location);
    if (date) searchParams.append("date", date.toISOString());
    if (time) searchParams.append("time", time);
    searchParams.append("budget", budget[0].toString());
    searchParams.append("fulfillment", fulfillmentType);

    navigate({
      pathname: "/search",
      search: searchParams.toString()
    });
  };

  return (
    <div className="bg-[#F5F4F2] rounded-lg p-3 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-4">
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
      
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <Button 
          className="bg-white hover:bg-white/90 text-black text-xs md:text-sm h-11 px-4 w-full rounded-lg border-[1.5px] border-black"
          onClick={() => handleSearch("delivery")}
        >
          <Truck className="w-4 h-4 mr-2" />
          Search Delivery
        </Button>
        <Button 
          className="bg-white hover:bg-white/90 text-black text-xs md:text-sm h-11 px-4 w-full rounded-lg border-[1.5px] border-black"
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </div>
  );
};