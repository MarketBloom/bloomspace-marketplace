import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateFilter } from "./home-filters/DateFilter";
import { TimeFilter } from "./home-filters/TimeFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { FilterBarLayout } from "./filters/FilterBarLayout";
import { Input } from "./ui/input";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [budget, setBudget] = useState<number[]>([500]);
  const [isAnyPrice, setIsAnyPrice] = useState(false);
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <FilterBarLayout onSearch={handleSearch}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-xs h-8 font-mono"
        />
      </div>
      <DateFilter date={date} setDate={setDate} />
      <TimeFilter time={time} setTime={setTime} />
      <BudgetFilter 
        budget={budget}
        setBudget={setBudget}
        isAnyPrice={isAnyPrice}
        setIsAnyPrice={setIsAnyPrice}
      />
    </FilterBarLayout>
  );
};