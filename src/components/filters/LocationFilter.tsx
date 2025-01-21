import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/integrations/supabase/client";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{display_name: string, lat: number, lon: number}>>([]);
  const debouncedValue = useDebounce(inputValue, 300);

  const formatDisplayName = (address: any): string => {
    const components = address.address;
    if (!components) return address.label || "";
    
    const suburb = components.district || components.city || components.county;
    const state = components.state || components.stateCode;
    const postcode = components.postalCode;

    if (suburb && state && postcode) {
      return `${suburb}, ${state} ${postcode}`;
    } else if (suburb && state) {
      return `${suburb}, ${state}`;
    }
    return address.label || "";
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 2) {
        setSuggestions([]);
        if (!debouncedValue) {
          setLocation('');
          if (onCoordsChange) {
            onCoordsChange(null);
          }
        }
        return;
      }

      try {
        setIsLoading(true);
        
        // Get HERE API key from Supabase
        const { data: secretData, error: secretError } = await supabase
          .rpc('get_secret', { secret_name: 'HERE_API_KEY' });

        if (secretError) throw new Error('Failed to get API key');
        if (!secretData || !secretData[0]?.secret) throw new Error('API key not found');

        const response = await fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(debouncedValue)}, Australia&limit=5&apiKey=${secretData[0].secret}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const searchData = await response.json();
        
        const formattedResults = searchData.items.map((item: any) => ({
          display_name: formatDisplayName(item),
          lat: item.position.lat,
          lon: item.position.lng
        }));

        setSuggestions(formattedResults);

      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue, setLocation, onCoordsChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSuggestionClick = (suggestion: {display_name: string, lat: number, lon: number}) => {
    setInputValue(suggestion.display_name);
    setLocation(suggestion.display_name);
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
          className={`w-full pl-8 h-[42px] bg-white/90 border border-black text-xs ${isLoading ? 'opacity-70' : ''}`}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
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