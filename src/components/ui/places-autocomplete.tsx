"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface PlacesAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}

export function PlacesAutocomplete({
  onPlaceSelect,
  className,
  placeholder = "Enter city or postcode",
  defaultValue = "",
}: PlacesAutocompleteProps) {
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
          types: ['(cities)'],
          componentRestrictions: { country: 'gb' }
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

  return (
    <div className="relative">
      <div ref={dummyElement} className="hidden" />
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => inputValue && setIsOpen(true)}
          className={cn(
            "w-full pl-8 py-2 h-9 text-xs",
            className
          )}
          placeholder={placeholder}
        />
      </div>

      {isOpen && predictions.length > 0 && (
        <Command className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-md border shadow-md">
          <CommandGroup>
            {predictions.map((prediction) => (
              <CommandItem
                key={prediction.place_id}
                onSelect={() => handleSelect(prediction.place_id)}
                className="text-xs py-2 px-2 cursor-pointer hover:bg-gray-100"
              >
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      )}
    </div>
  );
}