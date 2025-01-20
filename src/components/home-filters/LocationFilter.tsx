import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ location, setLocation, onCoordsChange }: LocationFilterProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getGoogleMapsKey = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-maps-key');
      if (error) throw error;
      return data.key;
    } catch (err) {
      console.error('Error getting Google Maps key:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;
    
    const initAutocomplete = async () => {
      const apiKey = await getGoogleMapsKey();
      if (!apiKey) return;

      // Load Google Maps JavaScript API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        const input = document.getElementById('location-input') as HTMLInputElement;
        const options = {
          componentRestrictions: { country: 'au' },
          fields: ['formatted_address', 'geometry']
        };
        
        autocomplete = new google.maps.places.Autocomplete(input, options);
        
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLocation(place.formatted_address || '');
            onCoordsChange?.([lat, lng]);
          }
        });
      };

      document.head.appendChild(script);
    };

    initAutocomplete();

    return () => {
      // Cleanup if needed
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [getGoogleMapsKey, setLocation, onCoordsChange]);

  return (
    <div className="relative">
      <Input
        id="location-input"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter suburb or postcode"
        className="h-11 bg-white border border-black rounded-lg text-xs"
      />
      {isLoading && (
        <div className="absolute right-3 top-3">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
};