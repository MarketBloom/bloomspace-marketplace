import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number[]>([0]);
  const [isAnyPrice, setIsAnyPrice] = useState(true);
  const [date, setDate] = useState<Date>();

  const handleSearch = () => {
    navigate('/search');
  };

  const formatBudgetDisplay = (value: number) => {
    if (isAnyPrice) return "Any";
    if (value >= 500) return "$500+";
    return `$${value}`;
  };

  const handleBudgetChange = (newValue: number[]) => {
    setIsAnyPrice(false);
    setBudget(newValue);
  };

  const toggleAnyPrice = () => {
    setIsAnyPrice(!isAnyPrice);
    if (!isAnyPrice) {
      setBudget([0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Enter city or postcode" 
              className="w-full pl-10 bg-white/20 border-0 placeholder:text-gray-300 text-white focus:bg-white/30"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Date & Time</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full relative justify-start text-left font-normal bg-white/20 border-0 hover:bg-white/30 text-white",
                  !date && "text-gray-300"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
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
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Budget ({formatBudgetDisplay(budget[0])})</label>
            <button 
              onClick={toggleAnyPrice}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${
                isAnyPrice 
                  ? 'bg-white/30 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Any Price
            </button>
          </div>
          <div className="relative bg-white/20 rounded-md h-10 flex items-center px-3">
            <Slider
              value={budget}
              onValueChange={handleBudgetChange}
              max={500}
              step={10}
              className={isAnyPrice ? 'opacity-50' : ''}
              disabled={isAnyPrice}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Occasion</label>
          <Select>
            <SelectTrigger className="bg-white/20 border-0 text-white focus:bg-white/30">
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
              <SelectItem value="sympathy">Sympathy</SelectItem>
              <SelectItem value="congratulations">Congratulations</SelectItem>
              <SelectItem value="all">All Occasions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        className="w-full md:w-auto px-8 py-2 bg-primary hover:bg-primary/90"
        onClick={handleSearch}
      >
        <Search className="w-4 h-4 mr-2" />
        Find Flowers
      </Button>
    </div>
  );
};