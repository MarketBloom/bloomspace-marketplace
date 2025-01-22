import { useState, useEffect, useRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suburb } from "@/data/types";
import { SYDNEY_SUBURBS } from "@/data/sydney-suburbs";
import { MELBOURNE_SUBURBS } from "@/data/melbourne-suburbs";
import { BRISBANE_SUBURBS } from "@/data/brisbane-suburbs";
import { Check, MapPin } from "lucide-react";

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
  placeholder = "Enter suburb or postcode",
  className
}: EnhancedLocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Suburb[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const allSuburbs = useMemo(() => {
    return [...SYDNEY_SUBURBS, ...MELBOURNE_SUBURBS, ...BRISBANE_SUBURBS];
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = allSuburbs.filter((suburb) => {
      const searchLower = term.toLowerCase();
      return (
        suburb.suburb.toLowerCase().includes(searchLower) ||
        suburb.postcode.includes(searchLower)
      );
    });

    setResults(searchResults.slice(0, 100));
    setShowResults(true);
  };

  const handleSelect = (suburb: Suburb) => {
    onLocationSelect(suburb);
    setSearchTerm(`${suburb.suburb}, ${suburb.state} ${suburb.postcode}`);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const groupedResults = useMemo(() => {
    const grouped: Record<string, Suburb[]> = {};
    results.forEach((suburb) => {
      if (!grouped[suburb.state]) {
        grouped[suburb.state] = [];
      }
      grouped[suburb.state].push(suburb);
    });
    return grouped;
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        event.target !== inputRef.current
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case "Escape":
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className={`relative w-full ${className || ''}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full"
        />
      </div>

      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-lg border shadow-lg"
        >
          <ScrollArea className="h-[280px] rounded-md">
            {Object.entries(groupedResults).map(([state, suburbs]) => (
              <div key={state} className="py-2">
                <div className="px-2 py-1 text-sm font-semibold text-muted-foreground bg-muted">
                  {state}
                </div>
                {suburbs.map((suburb, index) => {
                  const isSelected =
                    selectedIndex === results.findIndex((r) => r === suburb);
                  return (
                    <Button
                      key={`${suburb.suburb}-${suburb.postcode}`}
                      variant="ghost"
                      className={`w-full justify-start gap-2 rounded-none ${
                        isSelected ? "bg-accent" : ""
                      }`}
                      onClick={() => handleSelect(suburb)}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>
                        {suburb.suburb}, {suburb.postcode}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 ml-auto text-primary" />
                      )}
                    </Button>
                  );
                })}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};