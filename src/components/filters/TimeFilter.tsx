import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeFilterProps {
  time: string | null;
  setTime: (time: string | null) => void;
}

export const TimeFilter = ({ time, setTime }: TimeFilterProps) => {
  const timeSlots = [
    { label: "Any Time", value: null },
    ...Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return [
        { label: `${hour}:00`, value: `${hour}:00` },
        { label: `${hour}:30`, value: `${hour}:30` }
      ];
    }).flat()
  ];

  const handleSelect = (value: string | null) => {
    setTime(value);
    // Close popover by removing focus from trigger
    const popoverTrigger = document.activeElement as HTMLElement;
    popoverTrigger?.blur();
  };

  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Time</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white/90 border-white/20 h-[42px] text-xs",
              !time && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-3.5 w-3.5" />
            {time || "Any Time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0 border border-white/20" align="start">
          <div className="h-64 overflow-auto p-1">
            {timeSlots.map((slot) => (
              <Button
                key={slot.value || 'any'}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal text-xs h-8",
                  time === slot.value ? "bg-[#D02D53]/20 text-[#D02D53]" : ""
                )}
                onClick={() => handleSelect(slot.value)}
              >
                {slot.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};