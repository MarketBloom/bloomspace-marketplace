import { Slider } from "@/components/ui/slider";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
}

export const BudgetFilter = ({ budget, setBudget }: BudgetFilterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-white text-xs font-medium drop-shadow-sm">
          Budget (${budget[0]})
        </label>
      </div>
      <div className="px-3 py-3 rounded-lg bg-white/90 border border-white/20">
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={500}
          max={2000}
          step={50}
          className="w-full"
        />
      </div>
    </div>
  );
};