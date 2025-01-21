import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }>>([]);
  const debouncedValue = useDebounce(inputValue, 300);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('australian_suburbs')
          .select('*')
          .ilike('suburb', `%${debouncedValue}%`)
          .limit(5);

        if (error) {
          console.error('Error fetching suggestions:', error);
          toast({
            title: "Error",
            description: "Failed to fetch location suggestions. Please try again.",
            variant: "destructive"
          });
          return;
        }

        setSuggestions(data || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch location suggestions. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue, toast]);

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
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full pl-8 h-[42px] bg-white/90 border border-black text-xs ${isLoading ? 'opacity-70' : ''} ${className}`}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
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