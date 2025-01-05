import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateFilterProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const DateFilter = ({ date, setDate }: DateFilterProps) => {
  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    // Close popover by removing focus from trigger
    const popoverTrigger = document.activeElement as HTMLElement;
    popoverTrigger?.blur();
  };

  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Pickup or Delivered by</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white/90 border-white/20 h-[42px] text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            {date ? format(date, "PPP") : "Any Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2 border-b border-white/20">
            <Button
              variant="ghost"
              className="w-full justify-start font-normal text-xs h-8"
              onClick={() => handleSelect(undefined)}
            >
              Any Date
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            className="rounded-md border border-white/20"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};