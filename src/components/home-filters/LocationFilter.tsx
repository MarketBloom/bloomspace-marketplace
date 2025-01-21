import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{display_name: string, lat: number, lon: number}>>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle manual input changes with debounce
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If input is empty, clear everything
    if (!value) {
      setLocation('');
      setSuggestions([]);
      if (onCoordsChange) {
        onCoordsChange(null);
      }
      return;
    }

    // Set new timeout for fetching suggestions
    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        
        // Fetch suggestions from Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=au&limit=5`
        );
        
        const data = await response.json();
        
        setSuggestions(data.map((item: any) => ({
          display_name: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        })));

      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast.error("Error fetching location suggestions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce
  };

  const handleSuggestionClick = (suggestion: {display_name: string, lat: number, lon: number}) => {
    setInputValue(suggestion.display_name);
    setLocation(suggestion.display_name);
    if (onCoordsChange) {
      onCoordsChange([suggestion.lat, suggestion.lon]);
    }
    setSuggestions([]); // Clear suggestions after selection
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
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};