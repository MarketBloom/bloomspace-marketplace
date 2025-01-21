import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GoogleMapsResult {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export const useGoogleMaps = (initialLocation: string) => {
  const [inputValue, setInputValue] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GoogleMapsResult[]>([]);
  const { toast } = useToast();
  
  // Initialize Google Maps script
  const initializeGoogleMaps = useCallback(async () => {
    try {
      const { data: secretData, error: secretError } = await supabase
        .rpc('get_secret', { secret_name: 'GOOGLE_MAPS_API_KEY' });

      if (secretError) {
        console.error('Error fetching Google Maps API key:', secretError);
        toast({
          title: "Error",
          description: "Unable to load location search. Please try again later.",
          variant: "destructive"
        });
        return null;
      }

      if (!secretData?.[0]?.secret) {
        console.error('Google Maps API key not found');
        toast({
          title: "Configuration Error",
          description: "Location search is not properly configured.",
          variant: "destructive"
        });
        return null;
      }

      return secretData[0].secret;
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      toast({
        title: "Error",
        description: "Failed to initialize location search.",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const handleLocationSelect = useCallback(async (placeId: string) => {
    try {
      setIsLoading(true);
      const apiKey = await initializeGoogleMaps();
      if (!apiKey) return;

      // Load Google Maps script if not already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        
        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const geocoder = new google.maps.Geocoder();
      const result = await new Promise<google.maps.GeocoderResult | null>((resolve, reject) => {
        geocoder.geocode(
          { placeId: placeId },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              resolve(results[0]);
            } else {
              reject(new Error('Geocoding failed'));
            }
          }
        );
      });

      if (result && result.geometry.location) {
        return {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          formattedAddress: result.formatted_address
        };
      }
    } catch (error) {
      console.error('Error getting place details:', error);
      toast({
        title: "Error",
        description: "Could not get location details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [initializeGoogleMaps, toast]);

  const getPlacePredictions = useCallback(async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const apiKey = await initializeGoogleMaps();
      if (!apiKey) return;

      // Load Google Maps script if not already loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        
        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const service = new google.maps.places.AutocompleteService();
      const request = {
        input,
        componentRestrictions: { country: 'au' },
        types: ['geocode']
      };

      const predictions = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        service.getPlacePredictions(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error('Place predictions failed'));
          }
        });
      });

      setSuggestions(predictions as GoogleMapsResult[]);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      toast({
        title: "Error",
        description: "Could not fetch location suggestions.",
        variant: "destructive"
      });
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [initializeGoogleMaps, toast]);

  return {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    getPlacePredictions,
    handleLocationSelect
  };
};