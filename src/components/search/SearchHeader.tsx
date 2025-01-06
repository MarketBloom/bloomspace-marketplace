import { Button } from "@/components/ui/button";
import { Store, ShoppingBag } from "lucide-react";
import { MobileGridToggle } from "./MobileGridToggle";

interface SearchHeaderProps {
  viewMode: 'products' | 'florists';
  setViewMode: (mode: 'products' | 'florists') => void;
}

export const SearchHeader = ({ viewMode, setViewMode }: SearchHeaderProps) => {
  return (
    <div className="flex flex-col space-y-2 mb-3">
      <div className="flex space-x-2">
        <Button
          variant={viewMode === 'products' ? 'default' : 'outline'}
          className={`flex-1 h-9 text-xs ${
            viewMode === 'products' 
              ? 'bg-primary hover:bg-primary/90' 
              : 'border-black/20'
          }`}
          onClick={() => setViewMode('products')}
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
          Products
        </Button>
        <Button
          variant={viewMode === 'florists' ? 'default' : 'outline'}
          className={`flex-1 h-9 text-xs ${
            viewMode === 'florists' 
              ? 'bg-primary hover:bg-primary/90' 
              : 'border-black/20'
          }`}
          onClick={() => setViewMode('florists')}
        >
          <Store className="w-3.5 h-3.5 mr-1.5" />
          Florists
        </Button>
      </div>
      <MobileGridToggle />
    </div>
  );
};