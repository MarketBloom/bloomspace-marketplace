import { LocationSearchInput } from "./location/LocationSearchInput";
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
    handlePlaceSelected
  } = useGoogleMaps(location, (formattedAddress, coords) => {
    setLocation(formattedAddress);
    if (onCoordsChange) {
      onCoordsChange(coords);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
    }
  };

  return (
    <div className="relative">
      <LocationSearchInput
        inputValue={inputValue}
        isLoading={isLoading}
        onChange={handleInputChange}
        onPlaceSelected={handlePlaceSelected}
      />
    </div>
  );
};