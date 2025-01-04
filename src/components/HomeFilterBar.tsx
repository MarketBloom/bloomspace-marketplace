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
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | null>(null);
  const [budget, setBudget] = useState<number[]>([500]);

  const handleSearch = (fulfillmentType: "pickup" | "delivery") => {
    // Navigate to search with fulfillment type as URL parameter
    navigate(`/search?fulfillment=${fulfillmentType}`);
  };

  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-5 border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <LocationFilter />
        <DateFilter date={date} setDate={setDate} />
        <TimeFilter time={time} setTime={setTime} />
        <BudgetFilter budget={budget} setBudget={setBudget} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button 
          className="bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black text-sm h-11 px-4 w-full"
          onClick={() => handleSearch("delivery")}
        >
          <Truck className="w-4 h-4 mr-2" />
          Search Delivery
        </Button>
        <Button 
          className="bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black text-sm h-11 px-4 w-full"
          onClick={() => handleSearch("pickup")}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </div>
  );
};