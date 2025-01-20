import { useState } from "react";
import { LocationFilter } from "./filters/LocationFilter";
import { DateFilter } from "./filters/DateFilter";
import { BudgetFilter } from "./filters/BudgetFilter";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
import { ShoppingBag, Truck } from "lucide-react";

interface FilterBarProps {
  initialFulfillmentType: "pickup" | "delivery";
  initialDate?: Date;
  initialBudget: number[];
  initialLocation: string;
  onFilterChange: (updates: Record<string, string>) => void;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

export const FilterBar = ({
  initialFulfillmentType,
  initialDate,
  initialBudget,
  initialLocation,
  onFilterChange,
  onCoordinatesChange
}: FilterBarProps) => {
  const [fulfillmentType, setFulfillmentType] = useState(initialFulfillmentType);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [budget, setBudget] = useState<number[]>(initialBudget);
  const [location, setLocation] = useState<string>(initialLocation);

  const handleSearch = () => {
    const searchParams: Record<string, string> = {
      fulfillment: fulfillmentType,
      budget: budget[0].toString(),
      location,
    };

    if (date) {
      searchParams.date = date.toISOString();
    }

    onFilterChange(searchParams);
  };

  return (
    <div className="space-y-4">
      <LocationFilter
        location={location}
        setLocation={(loc) => {
          setLocation(loc);
          if (onCoordinatesChange) {
            onCoordinatesChange(0, 0); // Reset coordinates on location change
          }
        }}
        onCoordinatesChange={onCoordinatesChange}
      />
      <DateFilter date={date} setDate={setDate} />
      <BudgetFilter budget={budget} setBudget={setBudget} />

      <div className="grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-4">
        <RainbowButton
          onClick={() => {
            setFulfillmentType("delivery");
            handleSearch();
          }}
          className="w-full text-xs md:text-sm h-[42px] px-2 md:px-8"
        >
          <Truck className="w-4 h-4 mr-1 md:mr-2" />
          Search Delivery
        </RainbowButton>
        <Button
          className="bg-white hover:bg-white/90 text-black text-xs md:text-sm h-[42px] px-4 w-full rounded-lg border border-black"
          onClick={() => {
            setFulfillmentType("pickup");
            handleSearch();
          }}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </div>
  );
};
