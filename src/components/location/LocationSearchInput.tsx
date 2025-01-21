import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationSearchInputProps {
  inputValue: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export const LocationSearchInput = ({
  inputValue,
  isLoading,
  onChange,
  onPlaceSelected
}: LocationSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Function to initialize autocomplete
    const initializeAutocomplete = () => {
      if (!window.google || !inputRef.current) return;

      // Initialize the autocomplete object
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "au" },
        fields: ["address_components", "geometry", "formatted_address"],
      });

      // Add the place_changed event listener
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          onPlaceSelected(place);
        }
      });
    };

    // If Google Maps is already loaded, initialize immediately
    if (window.google && window.google.maps) {
      initializeAutocomplete();
    } else {
      // Otherwise wait for the script to load
      const handleGoogleMapsLoaded = () => {
        initializeAutocomplete();
      };
      window.addEventListener('google-maps-loaded', handleGoogleMapsLoaded);
      return () => {
        window.removeEventListener('google-maps-loaded', handleGoogleMapsLoaded);
      };
    }

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onPlaceSelected]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter suburb or postcode..."
        value={inputValue}
        onChange={onChange}
        className={`w-full pl-8 h-[42px] bg-white/90 border border-black text-xs ${isLoading ? 'opacity-70' : ''}`}
      />
      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
    </div>
  );
};
