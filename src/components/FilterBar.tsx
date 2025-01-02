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

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number[]>([0]);
  const [isAnyPrice, setIsAnyPrice] = useState(true);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="space-y-4 border border-black/10 rounded-lg p-4">
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
        isAnyPrice={isAnyPrice}
        setIsAnyPrice={setIsAnyPrice}
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
        className="w-full text-xs"
        onClick={handleSearch}
      >
        <Search className="w-3.5 h-3.5 mr-2" />
        Search Flowers
      </Button>
    </div>
  );
};