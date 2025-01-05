import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CategorySelectionProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export const CategorySelection = ({ 
  categories, 
  selectedCategories, 
  setSelectedCategories 
}: CategorySelectionProps) => {
  return (
    <div>
      <Label className="text-base">Categories</Label>
      <p className="text-sm text-muted-foreground mb-4">
        Select the categories that best describe your product
      </p>
      <div className="grid grid-cols-2 gap-4">
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
            />
            <Label htmlFor={`category-${category}`} className="text-sm font-normal">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};