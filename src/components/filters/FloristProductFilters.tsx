import { useState } from "react";
import { BudgetFilter } from "./BudgetFilter";
import { CategoryFilter } from "./CategoryFilter";
import { OccasionFilter } from "./OccasionFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleApplyFilters = () => {
    // Debug logs
    console.log("Applying filters:", {
      budget,
      selectedCategories,
      selectedOccasions
    });

    onFilterChange({
      budget,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      occasions: selectedOccasions.length > 0 ? selectedOccasions : undefined
    });

    toast({
      title: "Filters applied",
      description: "Your search results have been updated.",
    });
  };

  if (isMobile) {
    return (
      <div className="space-y-4 relative z-[60]">
        <div className="manual-filters-section">
          <Tabs defaultValue="budget" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white">
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="occasions">Occasions</TabsTrigger>
            </TabsList>
            <TabsContent value="budget" className="bg-white rounded-lg p-4 border border-black/10 mt-2">
              <BudgetFilter 
                budget={budget}
                setBudget={setBudget}
              />
            </TabsContent>
            <TabsContent value="categories" className="bg-white rounded-lg p-4 border border-black/10 mt-2">
              <CategoryFilter 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </TabsContent>
            <TabsContent value="occasions" className="bg-white rounded-lg p-4 border border-black/10 mt-2">
              <OccasionFilter 
                selectedOccasions={selectedOccasions}
                setSelectedOccasions={setSelectedOccasions}
              />
            </TabsContent>
          </Tabs>
          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black font-bold py-3 px-4 rounded mt-4 relative z-[70]"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white rounded-lg p-4 border border-black/10 relative z-[60]">
      <div className="manual-filters-section">
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
          className="w-full bg-[#C5E1A5] hover:bg-[#C5E1A5]/90 text-black font-bold py-3 px-4 rounded mt-4 relative z-[70]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};