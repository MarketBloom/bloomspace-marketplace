import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { TimeFilter } from "./filters/TimeFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { FilterBarLayout } from "./filters/FilterBarLayout";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [budget, setBudget] = useState<number[]>([50]);
  const [isAnyPrice, setIsAnyPrice] = useState(true);

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <FilterBarLayout onSearch={handleSearch}>
      <LocationFilter />
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