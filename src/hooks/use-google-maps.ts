import { useState, useEffect } from 'react';

declare global {
  interface Window {
    google: {
      maps: {
        Geocoder: new () => {
          geocode: (request: { address: string }, callback: (
            results: { geometry: { location: { lat: () => number; lng: () => number } } }[],
            status: string
          ) => void) => void;
        };
      };
    };
  }
}

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
    }
  }, []);

  const geocode = async (address: string): Promise<[number, number] | null> => {
    if (!window.google?.maps) {
      console.error('Google Maps not loaded');
      return null;
    }

    const geocoder = new window.google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const location = results[0].geometry.location;
          resolve([location.lat(), location.lng()]);
        } else {
          reject(new Error('Geocoding failed'));
        }
      });
    });
  };

  return { isLoaded, geocode };
};