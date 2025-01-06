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

  return (
    <div className="space-y-1.5">
      <label className="text-[#EFEEEA]/80 text-xs font-medium">Time</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left h-12 bg-[#EFEEEA]/10 border-[#EFEEEA]/10 text-[#EFEEEA]",
              !time && "text-[#EFEEEA]/40"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time || "Select time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0 border-[#EFEEEA]/10" align="start">
          <div className="h-64 overflow-auto p-1">
            {timeSlots.map((slot) => (
              <Button
                key={slot.value || 'any'}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-9",
                  time === slot.value ? "bg-[#FCBA24] text-[#050407]" : "text-[#EFEEEA]"
                )}
                onClick={() => setTime(slot.value)}
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