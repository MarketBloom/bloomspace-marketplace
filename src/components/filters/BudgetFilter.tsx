import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
  isAnyPrice: boolean;
  setIsAnyPrice: (value: boolean) => void;
}

export const BudgetFilter = ({ 
  budget, 
  setBudget, 
  isAnyPrice, 
  setIsAnyPrice 
}: BudgetFilterProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-foreground text-xs font-medium">
          Budget {isAnyPrice ? '(Any)' : `($${budget[0]})`}
        </label>
        <button 
          onClick={() => setIsAnyPrice(!isAnyPrice)}
          className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
            isAnyPrice 
              ? 'bg-primary text-white' 
              : 'bg-white/20 text-foreground hover:bg-white/30'
          }`}
        >
          Any Price
        </button>
      </div>
      <div className="px-2 py-2 rounded-md bg-white/90 border border-white/20 h-9 flex items-center">
        <Slider
          value={budget}
          onValueChange={(value) => {
            setBudget(value);
            setIsAnyPrice(false);
          }}
          max={500}
          step={10}
          className={cn("w-full", isAnyPrice && "opacity-50")}
          disabled={isAnyPrice}
        />
      </div>
    </div>
  );
};