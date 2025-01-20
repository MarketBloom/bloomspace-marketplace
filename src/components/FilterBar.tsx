import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateFilter } from "./filters/DateFilter";
import { TimeFilter } from "./filters/TimeFilter";
import { LocationFilter } from "./filters/LocationFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { FilterBarLayout } from "./filters/FilterBarLayout";
import { FulfillmentToggle } from "./filters/FulfillmentToggle";

interface FilterBarProps {
  initialFulfillmentType?: "pickup" | "delivery";
  initialDate?: Date;
  initialBudget?: number[];
  initialLocation?: string;
  onFilterChange?: (updates: Record<string, string>) => void;
}

export const FilterBar = ({
  initialFulfillmentType = "delivery",
  initialDate,
  initialBudget = [500],
  initialLocation = "",
  onFilterChange,
}: FilterBarProps) => {
  const navigate = useNavigate();
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">(
    initialFulfillmentType
  );
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState(initialLocation);
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (onFilterChange) {
      const updates: Record<string, string> = {};
      if (fulfillmentType) updates.fulfillment = fulfillmentType;
      if (date) updates.date = date.toISOString().split('T')[0];
      if (time) updates.time = time;
      if (location) updates.location = location;
      if (budget) updates.budget = budget[0].toString();
      onFilterChange(updates);
    }
  }, [fulfillmentType, date, time, location, budget, onFilterChange]);

  const handleSearch = () => {
    // Only proceed with search if we have coordinates when location is specified
    if (location && !userCoordinates) {
      console.warn('Location specified but coordinates not available');
      return;
    }

    const params = new URLSearchParams();
    if (fulfillmentType) params.set("fulfillment", fulfillmentType);
    if (date) params.set("date", date.toISOString().split('T')[0]);
    if (time) params.set("time", time);
    if (location) params.set("location", location);
    if (budget) params.set("budget", budget[0].toString());
    if (userCoordinates) {
      params.set("lat", userCoordinates[0].toString());
      params.set("lng", userCoordinates[1].toString());
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <FilterBarLayout onSearch={handleSearch}>
      <FulfillmentToggle
        value={fulfillmentType}
        onChange={setFulfillmentType}
      />
      <LocationFilter 
        location={location} 
        setLocation={setLocation}
        onCoordsChange={setUserCoordinates}
      />
      <DateFilter date={date} setDate={setDate} />
      <TimeFilter time={time} setTime={setTime} />
      <BudgetFilter budget={budget} setBudget={setBudget} />
    </FilterBarLayout>
  );
};