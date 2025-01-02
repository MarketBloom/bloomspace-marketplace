"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlacesAutocomplete } from "@/hooks/use-places-autocomplete";
import { PlacesPredictions } from "./places-predictions";

interface PlacesAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}

export function PlacesAutocomplete({
  onPlaceSelect,
  className,
  placeholder = "Enter suburb or postcode",
  defaultValue = "",
}: PlacesAutocompleteProps) {
  const {
    predictions,
    isOpen,
    inputValue,
    dummyElement,
    handleInput,
    handleSelect,
    setIsOpen
  } = usePlacesAutocomplete({ onPlaceSelect, defaultValue });

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
        <PlacesPredictions 
          predictions={predictions}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}