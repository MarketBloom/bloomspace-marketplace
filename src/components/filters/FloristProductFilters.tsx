import { useState, useEffect } from "react";
import { BudgetFilter } from "./BudgetFilter";
import { CategoryFilter } from "./CategoryFilter";
import { OccasionFilter } from "./OccasionFilter";

interface FloristProductFiltersProps {
  onFilterChange: (filters: {
    budget?: number[];
    categories?: string[];
    occasions?: string[];
  }) => void;
}

export const FloristProductFilters = ({ onFilterChange }: FloristProductFiltersProps) => {
  const [budget, setBudget] = useState<number[]>([500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      budget,
      categories: selectedCategories,
      occasions: selectedOccasions
    });
  }, [budget, selectedCategories, selectedOccasions, onFilterChange]);

  return (
    <div className="space-y-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-black/10">
      <BudgetFilter 
        budget={budget}
        setBudget={setBudget}
      />
      
      <CategoryFilter 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <OccasionFilter 
        selectedOccasions={selectedOccasions}
        setSelectedOccasions={setSelectedOccasions}
      />
    </div>
  );
};