import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useDebounceValue } from "usehooks-ts";

// Global script loading state
let googleMapsLoaded = false;
let loadingPromise: Promise<void> | null = null;

const loadGoogleMapsScript = async () => {
  if (googleMapsLoaded) return;
  
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-maps-key');
      
      if (error || !data?.apiKey) {
        throw new Error(error?.message || 'Failed to fetch API key');
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        googleMapsLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        reject(error);
      };

      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });

  return loadingPromise;
};

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

export const LocationFilter = ({ location, setLocation, onCoordinatesChange }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMounted = useRef(true);
  const lastGeocoded = useRef<string>("");
  const [debouncedValue] = useDebounceValue(inputValue, 500);

  const initAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places) return;

    try {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }

      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "au" },
        types: ["(cities)"],
        fields: ["formatted_address", "geometry", "name"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        if (!autocompleteRef.current || !isMounted.current) return;

        try {
          const place = autocompleteRef.current.getPlace();
          if (place?.geometry?.location && place.formatted_address) {
            if (lastGeocoded.current !== place.formatted_address) {
              lastGeocoded.current = place.formatted_address;
              setLocation(place.formatted_address);
              setInputValue(place.formatted_address);
              
              if (onCoordinatesChange) {
                onCoordinatesChange(
                  place.geometry.location.lat(),
                  place.geometry.location.lng()
                );
              }
            }
          }
        } catch (error) {
          toast.error("Error selecting location. Please try again.");
        }
      });
    } catch (error) {
      toast.error("Error initializing location search. Please try again.");
    }
  };

  useEffect(() => {
    if (!debouncedValue) {
      setLocation("");
      if (onCoordinatesChange) {
        onCoordinatesChange(0, 0);
      }
    }
  }, [debouncedValue, setLocation, onCoordinatesChange]);

  useEffect(() => {
    const setupAutocomplete = async () => {
      try {
        setIsLoading(true);
        await loadGoogleMapsScript();
        
        if (isMounted.current) {
          initAutocomplete();
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          toast.error("Error loading location search. Please try again.");
          setIsLoading(false);
        }
      }
    };

    setupAutocomplete();

    return () => {
      isMounted.current = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
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
  );
};