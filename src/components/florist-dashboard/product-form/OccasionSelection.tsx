import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface OccasionSelectionProps {
  occasions: string[];
  selectedOccasions: string[];
  setSelectedOccasions: (occasions: string[]) => void;
}

export const OccasionSelection = ({ 
  occasions, 
  selectedOccasions, 
  setSelectedOccasions 
}: OccasionSelectionProps) => {
  return (
    <div>
      <Label className="text-base">Occasions</Label>
      <p className="text-sm text-muted-foreground mb-4">
        Select the occasions this product is suitable for
      </p>
      <div className="grid grid-cols-2 gap-4">
        {occasions.map((occasion) => (
          <div key={occasion} className="flex items-center space-x-2">
            <Checkbox 
              id={`occasion-${occasion}`}
              checked={selectedOccasions.includes(occasion)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedOccasions([...selectedOccasions, occasion]);
                } else {
                  setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
                }
              }}
            />
            <Label htmlFor={`occasion-${occasion}`} className="text-sm font-normal">
              {occasion}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};