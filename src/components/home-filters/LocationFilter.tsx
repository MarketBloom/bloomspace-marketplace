import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Location</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input 
          type="text" 
          placeholder="Enter city or postcode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10 h-12 bg-white/90 border-white/20 text-foreground 
                     placeholder:text-muted-foreground focus:border-[#FCBA24] focus:ring-[#FCBA24]"
        />
      </div>
    </div>
  );
};