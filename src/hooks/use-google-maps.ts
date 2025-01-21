import { useState, useEffect } from 'react';

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }
    setIsLoaded(true);
  }, []);

  const geocode = async (address: string): Promise<[number, number] | null> => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps not loaded');
      return null;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ address: address });
      
      if (response && response.results && response.results[0]) {
        const { lat, lng } = response.results[0].geometry.location;
        return [lat(), lng()];
      }
      
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  return { isLoaded, geocode };
}