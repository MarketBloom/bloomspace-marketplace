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

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) {
        return;
      }

      try {
        setIsLoading(true);
        
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
          if (!autocompleteRef.current) return;

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

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Places Autocomplete:", error);
        toast.error("Error initializing location search. Please try again.");
        setIsLoading(false);
      }
    };

    loadGoogleMaps();

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      // Remove the script tag when component unmounts
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, [setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setLocation("");
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter location..."
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-8 h-[42px] bg-white/90 border border-black text-xs"
          ref={inputRef}
          disabled={isLoading}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
    </div>
  );
};