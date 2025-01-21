import { LocationSearch } from "./location/LocationSearch";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({
  location,
  setLocation,
  onCoordsChange
}: LocationFilterProps) => {
  const handleLocationSelect = (loc: { 
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }) => {
    setLocation(`${loc.suburb}, ${loc.state} ${loc.postcode}`);
    onCoordsChange([loc.latitude, loc.longitude]);
  };

  return (
    <div className="w-full">
      <LocationSearch
        onLocationSelect={handleLocationSelect}
        placeholder="Enter suburb or postcode"
      />
    </div>
  );
};