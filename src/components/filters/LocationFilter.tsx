import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useDebouncedCallback } from "use-hooks-ts";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

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

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMounted = useRef(true);
  const lastGeocoded = useRef<string>("");

  const initAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places) return;

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
            // Only update if the address has changed
            if (lastGeocoded.current !== place.formatted_address) {
              console.debug('Geocoding new location:', place.formatted_address);
              lastGeocoded.current = place.formatted_address;
              setLocation(place.formatted_address);
              setInputValue(place.formatted_address);
            }
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
  };

  // Debounced input handler
  const debouncedInputChange = useDebouncedCallback(
    (value: string) => {
      if (!value) {
        setLocation("");
      }
      setInputValue(value);
    },
    500 // 500ms delay
  );

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
        console.error("Error loading Google Maps:", error);
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
    debouncedInputChange(e.target.value);
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