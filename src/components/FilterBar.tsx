import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Sympathy",
  "Get Well",
  "Thank You",
  "New Baby",
  "Congratulations",
  "Just Because"
];

const categories = [
  "Bouquets",
  "Arrangements",
  "Roses",
  "Lilies",
  "Sunflowers",
  "Mixed Flowers",
  "Plants",
  "Seasonal"
];

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number[]>([0]);
  const [isAnyPrice, setIsAnyPrice] = useState(true);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Enter city or postcode" 
            className="w-full pl-10 bg-white"
          />
        </div>
      </div>
      
      {/* Date Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Pickup or Delivered by</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white",
                !date && "text-gray-500"
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
        <label className="text-sm font-medium text-black">Time</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white",
                !time && "text-gray-500"
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
      
      {/* Budget Filter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-black">Budget ({formatBudgetDisplay(budget[0])})</label>
          <button 
            onClick={toggleAnyPrice}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${
              isAnyPrice 
                ? 'bg-primary/20 text-primary' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Any Price
          </button>
        </div>
        <div className="px-3 py-4 rounded-md border bg-white">
          <Slider
            value={budget}
            onValueChange={handleBudgetChange}
            max={500}
            step={10}
            className={cn(
              "w-full",
              isAnyPrice ? 'opacity-50' : ''
            )}
            disabled={isAnyPrice}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Categories</label>
        <div className="space-y-2 bg-white border rounded-md p-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Occasions</label>
        <div className="space-y-2 bg-white border rounded-md p-3">
          {occasions.map((occasion) => (
            <div key={occasion} className="flex items-center space-x-2">
              <Checkbox 
                id={`occasion-${occasion}`}
                checked={selectedOccasions.includes(occasion)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedOccasions([...selectedOccasions, occasion]);
                  } else {
                    setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
                  }
                }}
              />
              <Label htmlFor={`occasion-${occasion}`}>{occasion}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={handleSearch}
      >
        <Search className="w-4 h-4 mr-2" />
        Search Flowers
      </Button>
    </div>
  );
};