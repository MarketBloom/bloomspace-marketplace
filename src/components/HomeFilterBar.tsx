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

  const handleSearch = (type: "delivery" | "pickup") => {
    setFulfillmentType(type);
    const searchParams = new URLSearchParams();
    
    if (location) searchParams.append("location", location);
    if (date) searchParams.append("date", date.toISOString());
    if (time) searchParams.append("time", time);
    searchParams.append("budget", budget[0].toString());
    searchParams.append("fulfillment", type);

    navigate({
      pathname: "/search",
      search: searchParams.toString()
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40">
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
          variant={fulfillmentType === "delivery" ? "default" : "secondary"}
          className={`h-12 text-sm ${
            fulfillmentType === "delivery" 
              ? "bg-[#D02D53] hover:bg-[#D02D53]/90 text-white" 
              : "bg-secondary hover:bg-secondary/90"
          }`}
          onClick={() => handleSearch("delivery")}
        >
          <Truck className="w-4 h-4 mr-2" />
          Delivery
        </Button>
        <Button 
          variant={fulfillmentType === "pickup" ? "default" : "secondary"}
          className={`h-12 text-sm ${
            fulfillmentType === "pickup" 
              ? "bg-[#D02D53] hover:bg-[#D02D53]/90 text-white" 
              : "bg-secondary hover:bg-secondary/90"
          }`}
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Pickup
        </Button>
      </div>
    </div>
  );
};