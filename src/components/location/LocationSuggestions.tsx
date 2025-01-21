interface LocationSuggestion {
  display_name: string;
  lat: number;
  lon: number;
}

interface LocationSuggestionsProps {
  suggestions: LocationSuggestion[];
  onSelect: (suggestion: LocationSuggestion) => void;
}

export const LocationSuggestions = ({ 
  suggestions, 
  onSelect 
}: LocationSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.display_name}
        </button>
      ))}
    </div>
  );
};