import { useState, useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    window.initMap = () => setIsLoaded(true);
  }, []);

  const geocode = async (address: string): Promise<[number, number] | null> => {
    if (!window.google) return null;

    try {
      const geocoder = new window.google.maps.Geocoder();
      const { results } = await geocoder.geocode({ address });
      
      if (results && results[0]) {
        const location = results[0].geometry.location;
        return [location.lat(), location.lng()];
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  return { isLoaded, geocode };
};