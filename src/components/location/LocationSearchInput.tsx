import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !inputRef.current) return;

      try {
        // Initialize the autocomplete object
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "au" },
          fields: ["address_components", "geometry", "formatted_address"],
          types: ["geocode"]
        });

        // Add the place_changed event listener
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place) {
            onPlaceSelected(place);
          }
        });
      } catch (error) {
        console.error("Error initializing Google Places Autocomplete:", error);
        toast({
          title: "Error",
          description: "Failed to initialize location search",
          variant: "destructive"
        });
      }
    };

    // If Google Maps is already loaded, initialize immediately
    if (window.google?.maps) {
      initAutocomplete();
    } else {
      // Otherwise wait for the script to load
      const handleGoogleMapsLoaded = () => {
        initAutocomplete();
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
  }, [onPlaceSelected, toast]);

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