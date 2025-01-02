import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");

  const handleSearch = () => {
    navigate('/search');
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Enter city or postcode" 
            className="w-full pl-10"
          />
        </div>
        
        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Time Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !time && "text-muted-foreground"
              )}
            >
              <Clock className="mr-2 h-4 w-4" />
              {time || "Select time"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <div className="h-64 overflow-auto p-1">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal",
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

      <div className="mt-4">
        <Button 
          className="w-full"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Flowers
        </Button>
      </div>
    </div>
  );
};