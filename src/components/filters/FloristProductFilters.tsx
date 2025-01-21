import { useState } from "react";
import { BudgetFilter } from "./BudgetFilter";
import { CategoryFilter } from "./CategoryFilter";
import { OccasionFilter } from "./OccasionFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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
  const isMobile = useIsMobile();

  const handleApplyFilters = () => {
    // Debug logs
    console.log("Current filter state:", {
      budget,
      selectedCategories,
      selectedOccasions
    });

    onFilterChange({
      budget,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      occasions: selectedOccasions.length > 0 ? selectedOccasions : undefined
    });
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Tabs defaultValue="budget" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90">
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
          </TabsList>
          <TabsContent value="budget" className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-black/10 mt-2">
            <BudgetFilter 
              budget={budget}
              setBudget={setBudget}
            />
          </TabsContent>
          <TabsContent value="categories" className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-black/10 mt-2">
            <CategoryFilter 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </TabsContent>
          <TabsContent value="occasions" className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-black/10 mt-2">
            <OccasionFilter 
              selectedOccasions={selectedOccasions}
              setSelectedOccasions={setSelectedOccasions}
            />
          </TabsContent>
        </Tabs>
        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black"
        >
          Apply Filters
        </Button>
      </div>
    );
  }

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

      <Button 
        onClick={handleApplyFilters}
        className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black"
      >
        Apply Filters
      </Button>
    </div>
  );
};