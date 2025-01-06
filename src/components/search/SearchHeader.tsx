import { Button } from "@/components/ui/button";
import { Store, ShoppingBag } from "lucide-react";

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
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
            : 'border-black/20'
        } md:rounded-full`}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Products
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => setViewMode('florists')}
        className={`flex-1 sm:flex-none text-sm ${
          viewMode === 'florists' 
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
            : 'border-black/20'
        } md:rounded-full`}
      >
        <Store className="h-4 w-4 mr-2" />
        Florists
      </Button>
    </div>
  );
};