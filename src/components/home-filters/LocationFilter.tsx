import { useCallback, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const libraries: ("places")[] = ["places"];

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
    libraries,
    loadingElement: <div>Loading...</div>,
  });

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    console.log("Autocomplete loaded successfully");
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      
      if (!place.geometry) {
        console.warn("Place selected has no geometry");
        return;
      }

      const address = place.formatted_address || place.name || '';
      setLocation(address);
    }
  }, [autocomplete, setLocation]);

  if (loadError) {
    return (
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative">
        <Input
          type="text"
          placeholder="Loading..."
          disabled
          className="w-full pl-10"
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        restrictions={{ country: "au" }}
        options={{
          types: ["(cities)"],
          componentRestrictions: { country: "au" }
        }}
      >
        <Input
          type="text"
          placeholder="Enter location..."
          defaultValue={location}
          className="w-full pl-10"
        />
      </Autocomplete>
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};