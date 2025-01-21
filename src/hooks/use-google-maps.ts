import { useState, useEffect } from 'react';

declare global {
  interface Window {
    google: {
      maps: {
        Geocoder: new () => {
          geocode: (
            request: { address: string },
            callback: (
              results: { geometry: { location: { lat: () => number; lng: () => number } } }[] | null,
              status: string
            ) => void
          ) => void;
        };
      };
    };
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
      return new Promise((resolve) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            resolve([location.lat(), location.lng()]);
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  return { isLoaded, geocode };
};