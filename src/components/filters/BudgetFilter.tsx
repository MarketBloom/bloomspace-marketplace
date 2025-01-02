import { Slider } from "@/components/ui/slider";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
}

export const BudgetFilter = ({ budget, setBudget }: BudgetFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">
        Budget {budget[0] === 500 ? "$500+" : `$${budget[0]}`}
      </label>
      <div className="h-9 bg-white/90 border border-white/20 rounded-md flex items-center px-2">
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={0}
          max={500}
          step={25}
          className="w-full"
        />
      </div>
    </div>
  );
};