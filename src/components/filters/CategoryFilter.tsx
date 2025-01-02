import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
  "Bouquets",
  "Arrangements",
  "Roses",
  "Lilies",
  "Sunflowers",
  "Mixed Flowers",
  "Plants",
  "Seasonal"
];

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export const CategoryFilter = ({ 
  selectedCategories, 
  setSelectedCategories 
}: CategoryFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Categories</label>
      <div className="space-y-2 bg-white/90 border border-white/20 rounded-md p-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox 
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedCategories([...selectedCategories, category]);
                } else {
                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                }
              }}
              className="h-3.5 w-3.5"
            />
            <Label htmlFor={`category-${category}`} className="text-xs">{category}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};