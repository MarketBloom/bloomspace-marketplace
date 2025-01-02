import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [budget, setBudget] = useState<number[]>([50]);
  const [isAnyPrice, setIsAnyPrice] = useState(true);

  const handleSearch = () => {
    navigate('/search');
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Location Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              type="text" 
              placeholder="Enter city or postcode" 
              className="w-full pl-10 bg-white/90"
            />
          </div>
        </div>
        
        {/* Date Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Pickup or Delivered by</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/90",
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
        </div>

        {/* Time Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Time</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/90",
                  !time && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {time || "12:00"}
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

        {/* Budget Filter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Budget {isAnyPrice ? '(Any)' : `($${budget[0]})`}</label>
            <button 
              onClick={() => setIsAnyPrice(!isAnyPrice)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                isAnyPrice 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Any Price
            </button>
          </div>
          <div className="px-3 py-4 rounded-md bg-white/90 border">
            <Slider
              value={budget}
              onValueChange={(value) => {
                setBudget(value);
                setIsAnyPrice(false);
              }}
              max={500}
              step={10}
              className={cn("w-full", isAnyPrice && "opacity-50")}
              disabled={isAnyPrice}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={handleSearch}
        >
          Search Flowers
        </Button>
      </div>
    </div>
  );
};