import { useEffect, useRef, useState } from "react";

interface UsePlacesAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  defaultValue?: string;
}

export function usePlacesAutocomplete({ 
  onPlaceSelect, 
  defaultValue = "" 
}: UsePlacesAutocompleteProps) {
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const dummyElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      if (dummyElement.current) {
        placesService.current = new google.maps.places.PlacesService(dummyElement.current);
      }
    }
  }, []);

  const handleInput = (value: string) => {
    setInputValue(value);
    if (!value) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          types: ['(cities)', 'sublocality', 'postal_code'],
          componentRestrictions: { country: 'au' }
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
            setIsOpen(true);
          } else {
            setPredictions([]);
            setIsOpen(false);
          }
        }
      );
    }
  };

  const handleSelect = (placeId: string) => {
    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: placeId,
          fields: ['address_components', 'formatted_address', 'geometry', 'name']
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            setInputValue(place.formatted_address || place.name || '');
            setIsOpen(false);
            onPlaceSelect(place);
          }
        }
      );
    }
  };

  return {
    predictions,
    isOpen,
    inputValue,
    dummyElement,
    handleInput,
    handleSelect,
    setIsOpen
  };
}