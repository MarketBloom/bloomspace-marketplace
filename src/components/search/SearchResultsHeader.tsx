import { Loader2 } from "lucide-react";
import { MobileGridToggle } from "./MobileGridToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchResultsHeaderProps {
  isLoading: boolean;
  count: number;
  type: 'products' | 'florists';
  isDoubleColumn: boolean;
  setIsDoubleColumn: (value: boolean) => void;
}

export const SearchResultsHeader = ({ 
  isLoading, 
  count, 
  type,
  isDoubleColumn,
  setIsDoubleColumn 
}: SearchResultsHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          `${count} ${type === 'products' ? 'Products' : 'Florists'} Found`
        )}
      </h2>
      {isMobile && type === 'products' && (
        <MobileGridToggle 
          isDoubleColumn={isDoubleColumn} 
          setIsDoubleColumn={setIsDoubleColumn}
        />
      )}
    </div>
  );
};