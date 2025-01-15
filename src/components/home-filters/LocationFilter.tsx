import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
}

export const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMounted = useRef(true);
  const scriptLoadedRef = useRef(false);

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
  };

  useEffect(() => {
    const loadGoogleMaps = async () => {
      // Check if Google Maps is already loaded and initialized
      if (window.google?.maps?.places && scriptLoadedRef.current) {
        initAutocomplete();
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch API key from Edge Function
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error || !data?.apiKey) {
          throw new Error(error?.message || 'Failed to fetch API key');
        }

        // Remove any existing Google Maps scripts
        const existingScripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
        existingScripts.forEach(script => script.remove());

        // Create and load the script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (isMounted.current) {
            scriptLoadedRef.current = true;
            // Wait for Google Maps to be fully initialized
            setTimeout(() => {
              if (isMounted.current) {
                initAutocomplete();
                setIsLoading(false);
              }
            }, 1000);
          }
        };

        script.onerror = () => {
          console.error('Failed to load Google Maps script');
          if (isMounted.current) {
            toast.error("Error loading location search. Please try again.");
            setIsLoading(false);
          }
        };

        document.head.appendChild(script);

      } catch (error) {
        console.error("Error loading Google Maps:", error);
        if (isMounted.current) {
          toast.error("Error loading location search. Please try again.");
          setIsLoading(false);
        }
      }
    };

    loadGoogleMaps();

    return () => {
      isMounted.current = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

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