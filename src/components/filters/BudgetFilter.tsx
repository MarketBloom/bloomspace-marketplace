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
  setBudget
}: BudgetFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">
        Budget ${budget[0]}{budget[0] >= 500 ? '+' : ''}
      </label>
      <div className="px-2 py-2 rounded-md bg-white/90 border border-white/20 h-9 flex items-center">
        <Slider
          defaultValue={[500]}
          value={budget}
          onValueChange={setBudget}
          min={0}
          max={500}
          step={10}
          className={cn(
            "w-full",
            "[&_.slider-thumb]:h-6 [&_.slider-thumb]:w-6 [&_.slider-thumb]:bg-[url('/sunflower.svg')] [&_.slider-thumb]:bg-contain [&_.slider-thumb]:bg-no-repeat [&_.slider-thumb]:bg-center",
            "[&_.slider-track]:bg-gradient-to-r [&_.slider-track]:from-green-300 [&_.slider-track]:to-green-500",
            "[&_.slider-track]:relative [&_.slider-track]:before:content-['🌿'] [&_.slider-track]:before:absolute [&_.slider-track]:before:top-[-8px] [&_.slider-track]:before:left-1/4 [&_.slider-track]:before:transform [&_.slider-track]:before:rotate-45",
            "[&_.slider-track]:after:content-['🌿'] [&_.slider-track]:after:absolute [&_.slider-track]:after:bottom-[-8px] [&_.slider-track]:after:right-1/4 [&_.slider-track]:after:transform [&_.slider-track]:after:rotate-[-45deg]"
          )}
        />
      </div>
    </div>
  );
};