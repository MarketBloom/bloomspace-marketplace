import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FilterBarLayoutProps {
  children: ReactNode;
  onSearch: () => void;
}

export const FilterBarLayout = ({ children, onSearch }: FilterBarLayoutProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-none border border-white/20 p-6 transition-all duration-300 hover:bg-white/98">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {children}
      </div>
      <div className="mt-4">
        <Button 
          className="w-full bg-black hover:bg-black/90 text-sm font-light tracking-wider h-10 rounded-none transition-colors duration-300"
          onClick={onSearch}
        >
          Search Flowers
        </Button>
      </div>
    </div>
  );
};