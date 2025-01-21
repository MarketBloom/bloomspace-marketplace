import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  if (loadingPromise) return loadingPromise;

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
      script.onerror = reject;
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });

  return loadingPromise;
};

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localInputValue, setLocalInputValue] = useState(location);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Initialize Google Maps only once on mount
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setIsLoading(true);
        await loadGoogleMapsScript();
        
        if (!mounted || !inputRef.current || !window.google?.maps?.places) return;

        // Clear any existing autocomplete
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "au" },
          types: ["(cities)"],
          fields: ["formatted_address", "geometry", "name"]
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log('Place selected:', place);

          if (place?.formatted_address && place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            setLocation(place.formatted_address);
            setLocalInputValue(place.formatted_address);
            
            if (onCoordsChange) {
              onCoordsChange([lat, lng]);
            }
          }
        });

        autocompleteRef.current = autocomplete;
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Places:", error);
        if (mounted) {
          setIsLoading(false);
          toast.error("Error loading location search");
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []); // Only run once on mount

  // Handle manual input changes with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInputValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If input is empty, clear immediately
    if (!value) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
      return;
    }

    // Set new timeout for non-empty values
    timeoutRef.current = setTimeout(() => {
      setLocation(value);
    }, 500);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter location..."
          value={localInputValue}
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