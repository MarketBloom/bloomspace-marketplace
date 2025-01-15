import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      // Cleanup existing autocomplete
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      // Remove script if it exists
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      if (!inputRef.current) return;

      // Check if Google Maps is already loaded
      if (window.google?.maps?.places) {
        try {
          // Clear any existing autocomplete
          if (autocompleteRef.current) {
            google.maps.event.clearInstanceListeners(autocompleteRef.current);
          }

          // Initialize new autocomplete instance
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: "au" },
            types: ["(cities)"],
            fields: ["formatted_address", "geometry", "name"],
          });

          // Add place_changed listener
          autocompleteRef.current.addListener("place_changed", () => {
            if (!autocompleteRef.current || !isMounted.current) return;

            try {
              const place = autocompleteRef.current.getPlace();
              if (place && place.formatted_address) {
                setLocation(place.formatted_address);
                setInputValue(place.formatted_address);
              }
            } catch (error) {
              console.error("Error handling place selection:", error);
              toast.error("Error selecting location. Please try again.");
            }
          });
        } catch (error) {
          console.error("Error initializing Places Autocomplete:", error);
          toast.error("Error initializing location search. Please try again.");
        }
      }
    };

    initializeAutocomplete();
  }, [setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setLocation("");
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Location</label>
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
        <Input 
          type="text" 
          placeholder="Enter city or postcode"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-8 h-[42px] bg-white/90 border border-black text-xs"
          ref={inputRef}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};