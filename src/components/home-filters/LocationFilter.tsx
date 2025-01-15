import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const libraries = ["places"];

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries as ["places"],
  });

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address || "";
      setLocation(formattedAddress);
    }
  };

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    // Fallback to regular input if Maps fails to load
    return (
      <div className="space-y-1.5">
        <label className="text-black text-xs font-medium">Location</label>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Enter city or postcode"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-8 h-11 bg-white border border-black text-xs rounded-lg"
          />
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="space-y-1.5">
        <label className="text-black text-xs font-medium">Location</label>
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Loading..."
            disabled
            className="w-full pl-8 h-11 bg-white border border-black text-xs rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label className="text-black text-xs font-medium">Location</label>
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 z-10" />
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          restrictions={{ country: "au" }}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "au" }
          }}
        >
          <Input 
            type="text" 
            placeholder="Enter city or postcode"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-8 h-11 bg-white border border-black text-xs rounded-lg"
          />
        </Autocomplete>
      </div>
    </div>
  );
};