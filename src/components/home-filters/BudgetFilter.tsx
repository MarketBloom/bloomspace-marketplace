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
      <label className="text-white text-xs font-medium drop-shadow-sm">
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
            "[&_.slider-thumb]:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"%23FFD700\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/><circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"%23FFA500\"/><path d=\"M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z\"/></svg>')] [&_.slider-thumb]:h-6 [&_.slider-thumb]:w-6",
            "[&_.slider-track]:bg-gradient-to-r [&_.slider-track]:from-green-300 [&_.slider-track]:to-green-500",
            "[&_.slider-track]:relative [&_.slider-track]:before:content-['🌿'] [&_.slider-track]:before:absolute [&_.slider-track]:before:top-[-8px] [&_.slider-track]:before:left-1/4 [&_.slider-track]:before:transform [&_.slider-track]:before:rotate-45",
            "[&_.slider-track]:after:content-['🌿'] [&_.slider-track]:after:absolute [&_.slider-track]:after:bottom-[-8px] [&_.slider-track]:after:right-1/4 [&_.slider-track]:after:transform [&_.slider-track]:after:rotate-[-45deg]"
          )}
        />
      </div>
    </div>
  );
};