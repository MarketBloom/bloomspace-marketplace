import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import debounce from 'lodash/debounce';

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
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

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMounted = useRef(true);

  // Debounced geocoding function
  const debouncedGeocode = useCallback(
    debounce((place: google.maps.places.PlaceResult) => {
      if (!place || !place.formatted_address || !place.geometry?.location || !isMounted.current) return;
      
      try {
        console.log('Geocoding result:', place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        setLocation(place.formatted_address);
        setInputValue(place.formatted_address);
        
        if (onCoordsChange) {
          onCoordsChange([lat, lng]);
        }
      } catch (error) {
        console.error("Error handling place selection:", error);
        toast.error("Error selecting location. Please try again.");
        if (onCoordsChange) {
          onCoordsChange(null);
        }
      }
    }, 500),
    [setLocation, onCoordsChange]
  );

  const initAutocomplete = useCallback(() => {
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
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();
        debouncedGeocode(place);
      });
    } catch (error) {
      console.error("Error initializing Places Autocomplete:", error);
      toast.error("Error initializing location search. Please try again.");
    }
  }, [debouncedGeocode]);

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
  }, [initAutocomplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setLocation("");
      if (onCoordsChange) {
        onCoordsChange(null);
      }
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