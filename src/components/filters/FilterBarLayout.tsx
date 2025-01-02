import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarLayoutProps {
  children: ReactNode;
  onSearch: () => void;
}

export const FilterBarLayout = ({ children, onSearch }: FilterBarLayoutProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        {children}
        <div className="md:col-span-1">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-sm font-medium h-[42px]"
            onClick={onSearch}
          >
            Search Flowers
          </Button>
        </div>
      </div>
    </div>
  );
};