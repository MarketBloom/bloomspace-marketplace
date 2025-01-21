import { useState, useEffect } from 'react';

interface UseLocationProps {
  searchParams: URLSearchParams;
  onCoordsChange: (coords: [number, number] | null) => void;
}

export const useGoogleMaps = ({ searchParams, onCoordsChange }: UseLocationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const location = searchParams.get('location');
    if (!location) {
      onCoordsChange(null);
      return;
    }

    const fetchCoordinates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=au&limit=1`
        );
        const data = await response.json();
        
        if (data && data[0]) {
          const coordinates: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          console.log('Geocoded coordinates:', coordinates);
          onCoordsChange(coordinates);
        } else {
          console.error('Geocoding failed: No results found');
          onCoordsChange(null);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        onCoordsChange(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [searchParams, onCoordsChange]);

  return { isLoading };
};