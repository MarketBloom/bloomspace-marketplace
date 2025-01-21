import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseGoogleMapsResult {
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  handlePlaceSelected: (place: google.maps.places.PlaceResult) => Promise<void>;
}

export const useGoogleMaps = (
  initialLocation: string,
  onLocationSelect?: (location: string, coords: [number, number]) => void
): UseGoogleMapsResult => {
  const [inputValue, setInputValue] = useState(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
        setIsLoading(true);
        const { data: secretData, error: secretError } = await supabase
          .rpc('get_secret', { secret_name: 'GOOGLE_MAPS_API_KEY' });

        if (secretError || !secretData?.[0]?.secret) {
          throw new Error('Failed to load Google Maps API key');
        }

        const apiKey = secretData[0].secret;
        
        // Check if script is already loaded
        if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
          script.async = true;
          script.defer = true;
          
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        toast({
          title: "Error",
          description: "Failed to load location search. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadGoogleMapsScript();
  }, [toast]);

  const handlePlaceSelected = useCallback(async (place: google.maps.places.PlaceResult) => {
    if (!place.geometry?.location) {
      toast({
        title: "Error",
        description: "Could not find location coordinates",
        variant: "destructive"
      });
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const formattedAddress = place.formatted_address || '';

    if (onLocationSelect) {
      onLocationSelect(formattedAddress, [lat, lng]);
    }
    setInputValue(formattedAddress);
  }, [onLocationSelect, toast]);

  return {
    inputValue,
    setInputValue,
    isLoading,
    handlePlaceSelected
  };
};