import { Slider } from "@/components/ui/slider";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
}

export const BudgetFilter = ({ budget, setBudget }: BudgetFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-foreground text-xs font-medium">
          Budget {budget[0] === 500 ? "$500+" : `$${budget[0]}`}
        </label>
      </div>
      <div className="px-3 py-3 rounded-lg bg-white/90 border border-white/20">
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