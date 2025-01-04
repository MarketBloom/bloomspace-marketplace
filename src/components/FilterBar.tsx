import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { TimeFilter } from "./filters/TimeFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { OccasionFilter } from "./filters/OccasionFilter";
import { FulfillmentToggle } from "./filters/FulfillmentToggle";

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number[]>([500]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery");

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="space-y-3 border border-black/10 rounded-lg p-3">
      <FulfillmentToggle 
        fulfillmentType={fulfillmentType}
        setFulfillmentType={setFulfillmentType}
      />
      
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