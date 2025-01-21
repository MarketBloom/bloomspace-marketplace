import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const formatDisplayName = (address: any): string => {
    // Extract relevant address components
    const street = address.address?.street || '';
    const houseNumber = address.address?.houseNumber || '';
    const suburb = address.address?.district || address.address?.city || address.address?.county || '';
    const state = address.address?.state || address.address?.stateCode || '';
    const postcode = address.address?.postalCode || '';

    // Build display string
    let display = '';
    if (street && houseNumber) {
      display += `${street} ${houseNumber}, `;
    }
    if (suburb) {
      display += `${suburb}, `;
    }
    if (state && postcode) {
      display += `${state} ${postcode}`;
    } else if (state) {
      display += state;
    }

    return display.trim() || address.title || '';
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
        
        const { data: secretData, error: secretError } = await supabase
          .rpc('get_secret', { secret_name: 'HERE_API_KEY' });

        if (secretError) {
          console.error('Error fetching API key:', secretError);
          toast({
            title: "Error",
            description: "Failed to load location search. Please try again.",
            variant: "destructive"
          });
          return;
        }
        
        if (!secretData || !secretData[0]?.secret) {
          console.error('API key not found in response:', secretData);
          toast({
            title: "Configuration Error",
            description: "Location search is not properly configured.",
            variant: "destructive"
          });
          return;
        }

        const apiKey = secretData[0].secret;
        // Format query to match HERE API requirements
        const query = encodeURIComponent(`${debouncedValue}, Australia`);
        const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&limit=4&apiKey=${apiKey}`;
        
        console.log('Making HERE API request:', apiUrl.replace(apiKey, 'REDACTED'));
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const searchData = await response.json();
        console.log('HERE API response:', searchData);
        
        if (!searchData.items || !Array.isArray(searchData.items)) {
          console.error('Unexpected API response format:', searchData);
          return;
        }

        const formattedResults = searchData.items.map((item: any) => ({
          display_name: formatDisplayName(item),
          lat: item.position.lat,
          lon: item.position.lng
        }));

        setSuggestions(formattedResults);

      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch location suggestions. Please try again.",
          variant: "destructive"
        });
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue, setLocation, onCoordsChange, toast]);

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