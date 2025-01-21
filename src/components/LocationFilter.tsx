import { LocationSearchInput } from "./location/LocationSearchInput";
import { LocationSuggestions } from "./location/LocationSuggestions";
import { useLocationSearch } from "./location/useLocationSearch";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ 
  location, 
  setLocation, 
  onCoordsChange 
}: LocationFilterProps) => {
  const {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    setSuggestions
  } = useLocationSearch(location, setLocation, onCoordsChange);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionSelect = (suggestion: { display_name: string, lat: number, lon: number }) => {
    setInputValue(suggestion.display_name);
    setLocation(suggestion.display_name);
    if (onCoordsChange) {
      onCoordsChange([suggestion.lat, suggestion.lon]);
    }
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <LocationSearchInput
        inputValue={inputValue}
        isLoading={isLoading}
        onChange={handleInputChange}
      />
      <LocationSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
      />
    </div>
  );
};