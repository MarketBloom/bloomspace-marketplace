import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

export const FilterBar = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <Input type="text" placeholder="Enter city or postcode" className="w-full" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Date & Time</label>
        <div className="relative">
          <Input type="text" placeholder="Select delivery time" className="w-full pl-10" />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Budget</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">Under $50</SelectItem>
            <SelectItem value="100">$50 - $100</SelectItem>
            <SelectItem value="200">$100 - $200</SelectItem>
            <SelectItem value="201">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Occasion</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select occasion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="birthday">Birthday</SelectItem>
            <SelectItem value="anniversary">Anniversary</SelectItem>
            <SelectItem value="sympathy">Sympathy</SelectItem>
            <SelectItem value="congratulations">Congratulations</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};