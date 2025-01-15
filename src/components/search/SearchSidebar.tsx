import { FilterBar } from "@/components/FilterBar";
import { useSearchParams } from "react-router-dom";

export const SearchSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  return (
    <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="w-full">
        <div className="bg-[#eed2d8] rounded-lg p-3 border border-black">
          <FilterBar 
            initialFulfillmentType={searchParams.get('fulfillment') as "pickup" | "delivery" || "delivery"}
            initialDate={searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined}
            initialTime={searchParams.get('time') || null}
            initialBudget={searchParams.get('budget') ? [parseInt(searchParams.get('budget')!)] : [500]}
            initialLocation={searchParams.get('location') || ""}
            onFilterChange={updateSearchParams}
          />
        </div>
      </div>
    </aside>
  );
};