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

  const formatDisplayName = (address: any): string => {
    if (!address || !address.address) return address.title || "";
    
    const components = address.address;
    const suburb = components.district || components.city || components.county;
    const state = components.state || components.stateCode;
    const postcode = components.postalCode;

    if (suburb && state && postcode) {
      return `${suburb}, ${state} ${postcode}`;
    } else if (suburb && state) {
      return `${suburb}, ${state}`;
    }
    return address.title || "";
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
        
        console.log('Starting API key fetch from Supabase...');
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
          console.error('API key response:', secretData);
          toast({
            title: "Configuration Error",
            description: "Location search is not properly configured. API key is missing.",
            variant: "destructive"
          });
          return;
        }

        const apiKey = secretData[0].secret;
        console.log('API key retrieved successfully, length:', apiKey.length);
        
        const query = encodeURIComponent(debouncedValue);
        const apiUrl = `https://autocomplete.search.hereapi.com/v1/autocomplete` + 
          `?q=${query}` +
          `&in=countryCode:AUS` +
          `&limit=4` +
          `&lang=en-AU` +
          `&resultTypes=address,place` +
          `&types=city,place,district,locality` +
          `&politicalView=AUS` +
          `&show=streetDetails` +
          `&apiKey=${apiKey}`;
        
        console.log('Making HERE API request to:', apiUrl.replace(apiKey, '[REDACTED]'));
        
        const response = await fetch(apiUrl);
        console.log('HERE API response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('HERE API error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        
        const searchData = await response.json();
        console.log('HERE API raw response:', searchData);
        
        if (!searchData.items || !Array.isArray(searchData.items)) {
          console.error('Unexpected API response format:', searchData);
          return;
        }

        const formattedResults = searchData.items
          .filter((item: any) => item.position) // Ensure item has coordinates
          .map((item: any) => ({
            display_name: formatDisplayName(item),
            lat: item.position.lat,
            lon: item.position.lng
          }));

        console.log('Formatted results:', formattedResults);
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