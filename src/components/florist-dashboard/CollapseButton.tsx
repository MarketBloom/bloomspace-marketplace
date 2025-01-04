import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const CollapseButton = ({ collapsed, onToggle }: CollapseButtonProps) => {
  return (
    <div className="border-t border-gray-100 p-4">
      <Button
        variant="ghost"
        className="w-full justify-center"
        onClick={onToggle}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};