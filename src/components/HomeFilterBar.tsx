import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./home-filters/LocationFilter";
import { DateFilter } from "./home-filters/DateFilter";
import { TimeFilter } from "./home-filters/TimeFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
import { ShoppingBag, Truck } from "lucide-react";
import { ShineBorder } from "./ui/shine-border";

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
    <ShineBorder 
      borderRadius={8}
      borderWidth={1}
      duration={14}
      color={["#D73459", "#eed2d8"]}
      className="w-full bg-[#eed2d8]/80 backdrop-blur-sm px-3 py-4 md:p-5"
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="w-full md:w-1/4">
          <LocationFilter 
            location={location}
            setLocation={setLocation}
          />
        </div>
        <div className="w-full md:w-1/4">
          <DateFilter 
            date={date} 
            setDate={setDate} 
          />
        </div>
        <div className="w-full md:w-1/4">
          <TimeFilter 
            time={time} 
            setTime={setTime} 
          />
        </div>
        <div className="w-full md:w-1/4">
          <BudgetFilter 
            budget={budget} 
            setBudget={setBudget} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-3 md:mt-4">
        <RainbowButton 
          onClick={() => handleSearch("delivery")}
          className="w-full text-xs md:text-sm h-11 px-2 md:px-8"
        >
          <Truck className="w-4 h-4 mr-1 md:mr-2" />
          Search Delivery
        </RainbowButton>
        <Button 
          className="bg-white hover:bg-white/90 text-black text-xs md:text-sm h-11 px-4 w-full rounded-lg border border-black"
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </ShineBorder>
  );
};