import { LocationSearchInput } from "./location/LocationSearchInput";
import { LocationSuggestions } from "./location/LocationSuggestions";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

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
    getPlacePredictions,
    handleLocationSelect
  } = useGoogleMaps(location);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
    }
  };

  const handleSuggestionSelect = async (placeId: string, description: string) => {
    const result = await handleLocationSelect(placeId);
    if (result) {
      setLocation(description);
      if (onCoordsChange) {
        onCoordsChange([result.lat, result.lng]);
      }
    }
  };

  return (
    <div className="relative">
      <LocationSearchInput
        inputValue={inputValue}
        isLoading={isLoading}
        onChange={handleInputChange}
        onSearch={getPlacePredictions}
      />
      <LocationSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
      />
    </div>
  );
};