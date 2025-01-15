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
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        setIsLoading(true);

        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.remove();
        }
        
        // Fetch API key from our Edge Function
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error || !data?.apiKey) {
          throw new Error(error?.message || 'Failed to fetch API key');
        }

        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          scriptRef.current = script;
          script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places&callback=initGoogleMaps`;
          script.async = true;
          script.defer = true;
          
          // Define the callback function globally
          window.initGoogleMaps = () => {
            initAutocomplete();
            resolve();
          };
          
          script.onerror = () => {
            reject(new Error('Failed to load Google Maps script'));
          };
          
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        toast.error("Error loading location search. Please try again.");
        setIsLoading(false);
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google) {
        return;
      }

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

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
      // Clean up the global callback
      delete window.initGoogleMaps;
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