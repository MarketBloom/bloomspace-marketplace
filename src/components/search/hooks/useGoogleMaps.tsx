import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseGoogleMapsProps {
  searchParams: URLSearchParams;
  onCoordsChange: (coords: [number, number] | null) => void;
}

export const useGoogleMaps = ({ searchParams, onCoordsChange }: UseGoogleMapsProps) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.remove();
        }
        
        // Fetch API key from Edge Function
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error || !data?.apiKey) {
          throw new Error(error?.message || 'Failed to fetch API key');
        }

        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            setIsGoogleMapsLoaded(true);
            resolve();
          };
          script.onerror = () => {
            reject(new Error('Failed to load Google Maps script'));
          };
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        toast.error("Error loading location services. Please try again.");
      }
    };

    loadGoogleMaps();

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    const location = searchParams.get('location');
    if (location && isGoogleMapsLoaded && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          onCoordsChange([lat(), lng()]);
        }
      });
    }
  }, [searchParams, isGoogleMapsLoaded, onCoordsChange]);

  return { isGoogleMapsLoaded };
};