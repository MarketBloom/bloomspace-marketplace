interface GoogleMapsResult {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface LocationSuggestionsProps {
  suggestions: GoogleMapsResult[];
  onSelect: (placeId: string, description: string) => void;
}

export const LocationSuggestions = ({ 
  suggestions, 
  onSelect 
}: LocationSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.place_id}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          onClick={() => onSelect(suggestion.place_id, suggestion.description)}
        >
          <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
          <div className="text-gray-600 text-xs">{suggestion.structured_formatting.secondary_text}</div>
        </button>
      ))}
    </div>
  );
};