import { PlacesAutocomplete } from "@/components/ui/places-autocomplete";

export const LocationFilter = () => {
  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    // Handle the selected place
    console.log('Selected place:', place);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-xs font-medium">Location</label>
      <PlacesAutocomplete 
        onPlaceSelect={handlePlaceSelect}
        className="bg-white/90 border border-white/20"
      />
    </div>
  );
};