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
            ? 'bg-white hover:bg-white/90 text-black border border-black' 
            : 'bg-white hover:bg-white/90 text-black border border-black'
        } rounded-lg`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Products
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => setViewMode('florists')}
        className={`flex-1 sm:flex-none text-xs h-11 ${
          viewMode === 'florists' 
            ? 'bg-white hover:bg-white/90 text-black border border-black' 
            : 'bg-white hover:bg-white/90 text-black border border-black'
        } rounded-lg`}
      >
        <Store className="h-4 w-4 mr-2" />
        Florists
      </Button>
    </div>
  );
};