import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarLayoutProps {
  children: ReactNode;
  onSearch: () => void;
}

export const FilterBarLayout = ({ children, onSearch }: FilterBarLayoutProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-5 border border-white/10 md:grid md:grid-cols-4 md:gap-4">
      <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-4">
        {children}
      </div>
      <div className="mt-4 md:mt-0 flex justify-end">
        <Button 
          className="bg-primary text-sm h-9 px-6"
          onClick={onSearch}
        >
          Search Flowers
        </Button>
      </div>
    </div>
  );
};