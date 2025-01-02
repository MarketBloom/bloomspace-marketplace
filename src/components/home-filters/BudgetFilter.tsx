import { Slider } from "@/components/ui/slider";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
}

export const BudgetFilter = ({ budget, setBudget }: BudgetFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-white text-xs font-medium drop-shadow-sm">
        Budget {budget[0] === 500 ? "$500+" : `$${budget[0]}`}
      </label>
      <div className="px-3 bg-white/90 border border-white/20 rounded-md h-[42px] flex items-center">
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