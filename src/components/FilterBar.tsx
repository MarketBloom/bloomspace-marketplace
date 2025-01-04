import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { TimeFilter } from "./filters/TimeFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { OccasionFilter } from "./filters/OccasionFilter";

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number[]>([500]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | null>(null);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="space-y-3 border border-black/10 rounded-lg p-3">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-medium">Fulfillment Method</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={fulfillmentType === "delivery" ? "default" : "outline"}
            onClick={() => setFulfillmentType("delivery")}
            className={`flex items-center justify-center h-[42px] text-xs ${
              fulfillmentType === "delivery" 
                ? "bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black" 
                : ""
            }`}
          >
            <Truck className="w-3.5 h-3.5 mr-2" />
            Delivery
          </Button>
          <Button
            variant={fulfillmentType === "pickup" ? "default" : "outline"}
            onClick={() => setFulfillmentType("pickup")}
            className={`flex items-center justify-center h-[42px] text-xs ${
              fulfillmentType === "pickup" 
                ? "bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black" 
                : ""
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-2" />
            Pickup
          </Button>
        </div>
      </div>
      
      <LocationFilter />
      
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
      
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <OccasionFilter 
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
      />

      <Button 
        className="w-full text-xs bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black rounded-full"
        onClick={handleSearch}
      >
        <Search className="w-3.5 h-3.5 mr-2" />
        Search Flowers
      </Button>
    </div>
  );
};