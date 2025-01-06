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
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">("delivery");

  const handleSearch = () => {
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
    <div className="bg-[#050407]/40 backdrop-blur-lg rounded-2xl p-6 border border-[#EFEEEA]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className={`h-12 text-sm ${
            fulfillmentType === "delivery" 
              ? "bg-[#FCBA24] hover:bg-[#FCBA24]/90 text-[#050407]" 
              : "bg-[#EFEEEA]/10 hover:bg-[#EFEEEA]/20 text-[#EFEEEA]"
          }`}
          onClick={() => setFulfillmentType("delivery")}
        >
          <Truck className="w-4 h-4 mr-2" />
          Delivery
        </Button>
        <Button 
          className={`h-12 text-sm ${
            fulfillmentType === "pickup" 
              ? "bg-[#FCBA24] hover:bg-[#FCBA24]/90 text-[#050407]" 
              : "bg-[#EFEEEA]/10 hover:bg-[#EFEEEA]/20 text-[#EFEEEA]"
          }`}
          onClick={() => setFulfillmentType("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Pickup
        </Button>
      </div>
    </div>
  );
};