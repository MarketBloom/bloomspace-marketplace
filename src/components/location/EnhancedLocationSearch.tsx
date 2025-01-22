import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AUSTRALIAN_SUBURBS } from '@/data/australian-suburbs';
import { Suburb } from '@/data/types';

interface EnhancedLocationSearchProps {
  onLocationSelect: (location: {
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }) => void;
  placeholder?: string;
  className?: string;
}

export const EnhancedLocationSearch = ({ 
  onLocationSelect, 
  placeholder = "Enter suburb or postcode...", 
  className = "" 
}: EnhancedLocationSearchProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Suburb[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  const { toast } = useToast();

  // Group results by state
  const groupedResults: Record<string, Suburb[]> = results.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, Suburb[]>);

  useEffect(() => {
    const searchLocations = () => {
      if (!debouncedValue.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log('Searching suburbs for:', debouncedValue);
        
        // Filter suburbs that start with the search term (case-insensitive)
        const filteredResults = AUSTRALIAN_SUBURBS.filter(suburb => 
          suburb.suburb.toLowerCase().startsWith(debouncedValue.toLowerCase())
        ).slice(0, 20); // Limit to 20 results for performance

        console.log('Suburbs found:', filteredResults);
        setResults(filteredResults);
      } catch (error) {
        console.error('Error searching locations:', error);
        toast({
          title: "Error",
          description: "Failed to search locations. Please try again.",
          variant: "destructive"
        });
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchLocations();
  }, [debouncedValue, toast]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const selectedLocation = results[activeIndex];
      if (selectedLocation) {
        handleSelect(selectedLocation);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (location: Suburb) => {
    setInputValue(`${location.suburb}, ${location.state} ${location.postcode}`);
    onLocationSelect(location);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pl-4 pr-10 h-[42px] bg-white/90 border border-black text-sm rounded-lg ${className}`}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="location-listbox"
          aria-activedescendant={activeIndex >= 0 ? `location-option-${activeIndex}` : undefined}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close location dropdown" : "Open location dropdown"}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="location-listbox"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              <p className="mt-2 text-sm">Searching suburbs...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {debouncedValue.trim() ? 'No results found. Please try another suburb.' : 'Start typing to search suburbs...'}
            </div>
          ) : (
            Object.entries(groupedResults).map(([state, locations]) => (
              <div key={state} className="py-1">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  {state}
                </div>
                {locations.map((location, index) => (
                  <button
                    key={`${location.suburb}-${location.postcode}`}
                    role="option"
                    id={`location-option-${index}`}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                      ${index === activeIndex ? 'bg-gray-100' : ''}`}
                    onClick={() => handleSelect(location)}
                    aria-selected={index === activeIndex}
                  >
                    {`${location.suburb}, ${location.state} ${location.postcode}`}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};