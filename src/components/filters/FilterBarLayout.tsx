import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarLayoutProps {
  children: ReactNode;
  onSearch: () => void;
}

export const FilterBarLayout = ({ children, onSearch }: FilterBarLayoutProps) => {
  return (
    <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        {children}
      </div>
      <div className="mt-3">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-sm font-medium h-9"
          onClick={onSearch}
        >
          Search Flowers
        </Button>
      </div>
    </div>
  );
};