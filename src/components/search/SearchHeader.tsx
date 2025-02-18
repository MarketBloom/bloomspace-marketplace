import { Button } from "@/components/ui/button";
import { ShoppingBag, Store } from "lucide-react";

interface SearchHeaderProps {
  viewMode: 'products' | 'florists';
  setViewMode: (mode: 'products' | 'florists') => void;
}

export const SearchHeader = ({ viewMode, setViewMode }: SearchHeaderProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={viewMode === 'products' ? 'default' : 'outline'}
        onClick={() => setViewMode('products')}
        className={`flex-1 sm:flex-none text-xs h-11 ${
          viewMode === 'products' 
            ? 'bg-[#E3E2E2] hover:bg-[#E3E2E2]/90 text-black' 
            : ''
        } rounded-lg`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Fresh Arrangements
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => setViewMode('florists')}
        className={`flex-1 sm:flex-none text-xs h-11 ${
          viewMode === 'florists' 
            ? 'bg-[#E3E2E2] hover:bg-[#E3E2E2]/90 text-black' 
            : ''
        } rounded-lg`}
      >
        <Store className="h-4 w-4 mr-2" />
        Curated Florists
      </Button>
    </div>
  );
};