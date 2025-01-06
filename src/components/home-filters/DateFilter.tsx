import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateFilterProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const DateFilter = ({ date, setDate }: DateFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-[#EFEEEA]/80 text-xs font-medium">Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left h-12 bg-[#EFEEEA]/10 border-[#EFEEEA]/10 text-[#EFEEEA]",
              !date && "text-[#EFEEEA]/40"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="rounded-md border-[#EFEEEA]/10"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};