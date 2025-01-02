import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

interface PlacesPredictionsProps {
  predictions: google.maps.places.AutocompletePrediction[];
  onSelect: (placeId: string) => void;
}

export function PlacesPredictions({ predictions, onSelect }: PlacesPredictionsProps) {
  return (
    <Command className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-md border shadow-md">
      <CommandGroup>
        {predictions.map((prediction) => (
          <CommandItem
            key={prediction.place_id}
            onSelect={() => onSelect(prediction.place_id)}
            className="text-xs py-2 px-2 cursor-pointer hover:bg-gray-100"
          >
            {prediction.description}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}