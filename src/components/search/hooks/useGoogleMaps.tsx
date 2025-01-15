import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseGoogleMapsProps {
  searchParams: URLSearchParams;
  onCoordsChange: (coords: [number, number] | null) => void;
}

export const useGoogleMaps = ({ searchParams, onCoordsChange }: UseGoogleMapsProps) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const location = searchParams.get('location');
    if (!location || !isGoogleMapsLoaded) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        onCoordsChange([lat(), lng()]);
      } else {
        onCoordsChange(null);
        console.error('Geocoding failed:', status);
      }
    });
  }, [searchParams, isGoogleMapsLoaded, onCoordsChange]);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        if (error) throw error;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.onload = () => setIsGoogleMapsLoaded(true);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, []);

  return { isGoogleMapsLoaded };
};