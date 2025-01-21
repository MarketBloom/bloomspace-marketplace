import { useState, useEffect, useCallback } from 'react';
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
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const { toast } = useToast();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Initialize Google Maps Autocomplete service
  useEffect(() => {
    const loadGoogleMapsScript = async () => {
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
          return;
        }

        if (!secretData?.[0]?.secret) {
          console.error('Google Maps API key not found');
          toast({
            title: "Configuration Error",
            description: "Location search is not properly configured.",
            variant: "destructive"
          });
          return;
        }

        const apiKey = secretData[0].secret;
        
        if (!document.querySelector('#google-maps-script')) {
          const script = document.createElement('script');
          script.id = 'google-maps-script';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          document.head.appendChild(script);

          script.onload = () => {
            initializeAutocomplete();
          };
        } else {
          initializeAutocomplete();
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        toast({
          title: "Error",
          description: "Failed to initialize location search.",
          variant: "destructive"
        });
      }
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [toast]);

  const initializeAutocomplete = () => {
    const input = document.createElement('input');
    const autocompleteInstance = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'au' },
      types: ['geocode'],
      fields: ['address_components', 'geometry', 'formatted_address']
    });

    setAutocomplete(autocompleteInstance);

    google.maps.event.addListener(autocompleteInstance, 'place_changed', () => {
      const place = autocompleteInstance.getPlace();
      if (place.geometry?.location) {
        setCoordinates([
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ]);
        setInputValue(place.formatted_address || '');
        setSuggestions([]);
      }
    });
  };

  const getPlacePredictions = useCallback(async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const service = new google.maps.places.AutocompleteService();
      const request = {
        input,
        componentRestrictions: { country: 'au' },
        types: ['geocode']
      };

      const response = await service.getPlacePredictions(request);
      setSuggestions(response.predictions as GoogleMapsResult[]);
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
  }, [toast]);

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setIsLoading(true);
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
        setCoordinates([
          result.geometry.location.lat(),
          result.geometry.location.lng()
        ]);
        setInputValue(description);
        setSuggestions([]);
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
  };

  return {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    coordinates,
    getPlacePredictions,
    handleLocationSelect
  };
};