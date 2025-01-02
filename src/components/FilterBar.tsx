import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FilterBar = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState([0]);

  const handleSearch = () => {
    navigate('/search');
  };

  const formatBudgetDisplay = (value: number) => {
    if (value >= 500) return "$500+";
    return `$${value}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Same day or schedule" 
              className="w-full pl-10 bg-white/20 border-0 placeholder:text-gray-300 text-white focus:bg-white/30"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Budget ({formatBudgetDisplay(budget[0])})</label>
          <div className="px-3 py-2 bg-white/20 rounded-md">
            <Slider
              value={budget}
              onValueChange={setBudget}
              max={500}
              step={10}
              className="my-4"
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