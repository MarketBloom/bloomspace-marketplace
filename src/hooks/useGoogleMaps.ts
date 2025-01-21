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

  // Initialize Google Maps Autocomplete service
  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
        const { data: secretData, error: secretError } = await supabase
          .rpc('get_secret', { secret_name: 'GOOGLE_MAPS_API_KEY' });

        if (secretError || !secretData?.[0]?.secret) {
          console.error('Error fetching Google Maps API key:', secretError);
          return;
        }

        const apiKey = secretData[0].secret;
        
        if (!document.querySelector('#google-maps-script')) {
          const script = document.createElement('script');
          script.id = 'google-maps-script';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMapsScript();
  }, []);

  const getPlacePredictions = useCallback(async (input: string) => {
    if (!input || !window.google) return;

    const service = new window.google.maps.places.AutocompleteService();
    const request = {
      input,
      componentRestrictions: { country: 'au' },
      types: ['geocode']
    };

    try {
      const response = await service.getPlacePredictions(request);
      setSuggestions(response.predictions as GoogleMapsResult[]);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setSuggestions([]);
    }
  }, []);

  const getPlaceDetails = useCallback(async (placeId: string) => {
    if (!window.google) return null;

    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    return new Promise((resolve, reject) => {
      service.getDetails(
        { placeId, fields: ['geometry', 'formatted_address'] },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && result?.geometry?.location) {
            resolve({
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              address: result.formatted_address
            });
          } else {
            reject(new Error('Could not get place details'));
          }
        }
      );
    });
  }, []);

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setIsLoading(true);
      const details: any = await getPlaceDetails(placeId);
      setCoordinates([details.lat, details.lng]);
      setInputValue(description);
      setSuggestions([]);
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