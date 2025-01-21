import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle manual input changes with debounce
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If input is empty, clear immediately
    if (!value) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
      return;
    }

    // Set new timeout for geocoding
    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        
        // Basic geocoding using OpenStreetMap Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=au`
        );
        
        const data = await response.json();
        
        if (data && data[0]) {
          setLocation(data[0].display_name);
          if (onCoordsChange) {
            onCoordsChange([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          }
        } else {
          if (onCoordsChange) {
            onCoordsChange(null);
          }
          toast.error("Location not found. Please try a different search.");
        }
      } catch (error) {
        console.error("Error geocoding location:", error);
        toast.error("Error finding location. Please try again.");
        if (onCoordsChange) {
          onCoordsChange(null);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter suburb or postcode..."
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-8 h-[42px] bg-white/90 border border-black text-xs"
          disabled={isLoading}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
    </div>
  );
};