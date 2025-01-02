import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarLayoutProps {
  children: ReactNode;
  onSearch: () => void;
}

export const FilterBarLayout = ({ children, onSearch }: FilterBarLayoutProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-5 border border-white/10">
      <div className="grid grid-cols-1 gap-4">
        {children}
      </div>
      <div className="mt-4">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-sm font-medium h-12"
          onClick={onSearch}
        >
          Search Flowers
        </Button>
      </div>
    </div>
  );
};