import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeFilterProps {
  time: string;
  setTime: (time: string) => void;
}

export const TimeFilter = ({ time, setTime }: TimeFilterProps) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Time</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white/90 border-white/20 h-9 text-xs",
              !time && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-3.5 w-3.5" />
            {time || "12:00"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0 border border-white/20" align="start">
          <div className="h-64 overflow-auto p-1">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal text-xs h-8",
                  time === slot ? "bg-primary/20 text-primary" : ""
                )}
                onClick={() => {
                  setTime(slot);
                  const popoverTrigger = document.activeElement as HTMLElement;
                  popoverTrigger?.blur();
                }}
              >
                {slot}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};