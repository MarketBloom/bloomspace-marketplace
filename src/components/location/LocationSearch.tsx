import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useLocationSearch } from "@/hooks/useLocationSearch";

interface LocationSearchProps {
  onLocationSelect?: (location: { 
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }) => void;
  placeholder?: string;
  className?: string;
}

export const LocationSearch = ({ 
  onLocationSelect,
  placeholder = "Enter suburb or postcode...",
  className = ""
}: LocationSearchProps) => {
  const {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    setSuggestions
  } = useLocationSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: {
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }) => {
    setInputValue(`${suggestion.suburb}, ${suggestion.state} ${suggestion.postcode}`);
    setSuggestions([]);
    if (onLocationSelect) {
      onLocationSelect(suggestion);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full pl-8 h-[42px] bg-white border border-black text-xs ${isLoading ? 'opacity-70' : ''} ${className}`}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.suburb}, {suggestion.state} {suggestion.postcode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};