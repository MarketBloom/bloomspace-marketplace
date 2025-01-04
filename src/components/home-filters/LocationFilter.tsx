import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-white text-xs font-medium drop-shadow-sm">Location</label>
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
        <Input 
          type="text" 
          placeholder="Enter city or postcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-8 py-2 h-9 bg-white/90 border border-white/20 text-xs"
        />
      </div>
    </div>
  );
};