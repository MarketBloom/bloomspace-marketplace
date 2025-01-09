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

  const filterContent = (
    <div className="bg-[#eed2d8]/80 backdrop-blur-sm p-2 md:p-5 mt-5 md:mt-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 md:gap-4 mb-2 md:mb-4">
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
      
      <div className="grid grid-cols-2 gap-1.5 md:gap-4">
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
    </div>
  );

  return (
    <ShineBorder
      borderRadius={12}
      borderWidth={2}
      duration={10}
      color={["#D73459", "#eed2d8"]}
      className="!min-w-0 !w-full !p-0 !bg-transparent"
    >
      {filterContent}
    </ShineBorder>
  );
};