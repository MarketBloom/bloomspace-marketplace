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
        className={`flex-1 sm:flex-none text-sm h-10 ${
          viewMode === 'products' 
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
            : ''
        } rounded-full`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        <span className="whitespace-nowrap">Products</span>
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => setViewMode('florists')}
        className={`flex-1 sm:flex-none text-sm h-10 ${
          viewMode === 'florists' 
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
            : ''
        } rounded-full`}
      >
        <Store className="h-4 w-4 mr-2" />
        <span className="whitespace-nowrap">Florists</span>
      </Button>
    </div>
  );
};