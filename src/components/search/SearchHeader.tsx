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
        className={`flex-1 sm:flex-none text-sm ${
          viewMode === 'products' 
            ? 'bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black' 
            : ''
        } rounded-full`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Products
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => setViewMode('florists')}
        className={`flex-1 sm:flex-none text-sm ${
          viewMode === 'florists' 
            ? 'bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black' 
            : ''
        } rounded-full`}
      >
        <Store className="h-4 w-4 mr-2" />
        Florists
      </Button>
    </div>
  );
};