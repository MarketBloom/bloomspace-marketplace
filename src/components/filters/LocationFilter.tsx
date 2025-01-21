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

  // Format the display name to be more concise
  const formatDisplayName = (fullName: string): string => {
    const parts = fullName.split(', ');
    // Take first 3 parts max (usually suburb, city, state)
    const relevantParts = parts.slice(0, 3);
    // Always add country as last part if it's Australia
    if (parts[parts.length - 1] === 'Australia') {
      relevantParts.push('Australia');
    }
    return relevantParts.join(', ');
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value) {
      setLocation('');
      setSuggestions([]);
      if (onCoordsChange) {
        onCoordsChange(null);
      }
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        
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
    }, 300);
  };

  const handleSuggestionClick = (suggestion: {display_name: string, lat: number, lon: number}) => {
    const formattedName = formatDisplayName(suggestion.display_name);
    setInputValue(formattedName);
    setLocation(formattedName);
    if (onCoordsChange) {
      onCoordsChange([suggestion.lat, suggestion.lon]);
    }
    setSuggestions([]);
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
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {formatDisplayName(suggestion.display_name)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};