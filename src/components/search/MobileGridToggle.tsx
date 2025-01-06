import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3 } from "lucide-react";

interface MobileGridToggleProps {
  isDoubleColumn: boolean;
  setIsDoubleColumn: (value: boolean) => void;
}

export const MobileGridToggle = ({ isDoubleColumn, setIsDoubleColumn }: MobileGridToggleProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setIsDoubleColumn(!isDoubleColumn)}
      className="flex items-center gap-2"
    >
      {isDoubleColumn ? (
        <>
          <Grid3X3 className="w-4 h-4" />
          Single Column
        </>
      ) : (
        <>
          <Grid2X2 className="w-4 h-4" />
          Double Column
        </>
      )}
    </Button>
  );
};