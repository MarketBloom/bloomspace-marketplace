import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LocationSuggestion {
  display_name: string;
  lat: number;
  lon: number;
}

export const useLocationSearch = (
  initialLocation: string,
  onLocationChange: (location: string) => void,
  onCoordsChange?: (coords: [number, number] | null) => void
) => {
  const [inputValue, setInputValue] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const debouncedValue = useDebounce(inputValue, 300);
  const { toast } = useToast();

  const formatDisplayName = (item: any): string => {
    if (!item || !item.address) return item.title || "";
    
    const address = item.address;
    const suburb = address.district || address.city || address.county;
    const state = address.state || address.stateCode;
    const postcode = address.postalCode;

    if (suburb && state && postcode) {
      return `${suburb}, ${state} ${postcode}`;
    } else if (suburb && state) {
      return `${suburb}, ${state}`;
    }
    return item.label || "";
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 2) {
        setSuggestions([]);
        if (!debouncedValue) {
          onLocationChange('');
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

        const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(debouncedValue)}, Australia&limit=5&apiKey=${secretData[0].secret}`;
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const searchData = await response.json();
        
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
  }, [debouncedValue, onLocationChange, onCoordsChange, toast]);

  return {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    setSuggestions
  };
};