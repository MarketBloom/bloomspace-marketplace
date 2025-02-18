import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateFilter } from "./home-filters/DateFilter";
import { BudgetFilter } from "./home-filters/BudgetFilter";
import { Button } from "./ui/button";
import { RainbowButton } from "./ui/rainbow-button";
import { ShoppingBag, Truck } from "lucide-react";
import { ShineBorder } from "./ui/shine-border";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { supabase } from "@/integrations/supabase/client";

export const HomeFilterBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState<number[]>([500]);
  const [location, setLocation] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
  }>>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Parse search term into components
  const parseSearchTerm = (term: string) => {
    const parts = term.trim().split(/[\s,]+/);
    let suburb = "", state = "", postcode = "";
    
    parts.forEach(part => {
      if (part.match(/^\d{4}$/)) {
        postcode = part;
      } else if (part.length === 2 || part.length === 3) {
        state = part.toUpperCase();
      } else {
        suburb = suburb ? `${suburb} ${part}` : part;
      }
    });
    
    return { suburb: suburb.trim(), state, postcode };
  };

  // State priority order
  const statePriority: { [key: string]: number } = {
    'NSW': 1,
    'VIC': 2,
    'QLD': 3,
    'ACT': 4,
    'WA': 5,
    'SA': 6,
    'TAS': 7,
    'NT': 8
  };

  // Fetch suburb suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const { suburb, state, postcode } = parseSearchTerm(debouncedSearchTerm);
        
        let query = supabase
          .from('australian_suburbs')
          .select('*');

        // Build query based on parsed components
        if (suburb) {
          query = query.ilike('suburb', `${suburb}%`);
        }
        if (state) {
          query = query.ilike('state', state);
        }
        if (postcode) {
          query = query.eq('postcode', postcode);
        }

        const { data, error } = await query.limit(10);

        if (error) throw error;

        // Sort data with multiple criteria
        const sortedData = data?.sort((a, b) => {
          // Exact postcode match gets highest priority
          if (postcode) {
            const aPostcodeMatch = a.postcode === postcode;
            const bPostcodeMatch = b.postcode === postcode;
            if (aPostcodeMatch !== bPostcodeMatch) {
              return aPostcodeMatch ? -1 : 1;
            }
          }

          // State priority
          const stateDiff = (statePriority[a.state] || 999) - (statePriority[b.state] || 999);
          if (stateDiff !== 0) return stateDiff;

          // Exact suburb match gets next priority
          if (suburb) {
            const aSuburbMatch = a.suburb.toLowerCase() === suburb.toLowerCase();
            const bSuburbMatch = b.suburb.toLowerCase() === suburb.toLowerCase();
            if (aSuburbMatch !== bSuburbMatch) {
              return aSuburbMatch ? -1 : 1;
            }
          }

          // Finally, sort by distance from CBD
          const distanceA = calculateDistance(a.latitude, a.longitude, a.state);
          const distanceB = calculateDistance(b.latitude, b.longitude, b.state);
          return distanceA - distanceB;
        });

        setSuggestions(sortedData || []);
      } catch (error) {
        console.error('Error fetching suburbs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch suburb suggestions",
          variant: "destructive"
        });
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm, toast]);

  // Helper function to calculate distance from CBD
  const calculateDistance = (lat: number, lon: number, state: string): number => {
    const cbdCoordinates: { [key: string]: [number, number] } = {
      'NSW': [-33.8688, 151.2093],
      'VIC': [-37.8136, 144.9631],
      'QLD': [-27.4705, 153.0260],
      'ACT': [-35.2809, 149.1300],
      'WA': [-31.9505, 115.8605],
      'SA': [-34.9285, 138.6007],
      'TAS': [-42.8821, 147.3272],
      'NT': [-12.4634, 130.8456]
    };

    const cbd = cbdCoordinates[state];
    if (!cbd) return 999999;

    // Calculate Euclidean distance (simplified for performance)
    return Math.sqrt(
      Math.pow(lat - cbd[0], 2) + 
      Math.pow(lon - cbd[1], 2)
    );
  };

  const handleSearch = async (fulfillmentType: "pickup" | "delivery") => {
    if (isSearching) return;
    
    setIsSearching(true);
    
    try {
      // Only proceed with search if we have both location and coordinates when location is entered
      if (location && !coordinates) {
        toast({
          title: "Location Error",
          description: "Please enter a valid suburb or postcode",
          variant: "destructive"
        });
        return;
      }

      const searchParams = new URLSearchParams();
      
      // Only include location params if we have both location text and coordinates
      if (location && coordinates) {
        searchParams.append("location", location);
        searchParams.append("lat", coordinates[0].toString());
        searchParams.append("lng", coordinates[1].toString());
      }
      
      // If date is today, also include the current time to filter by cutoff
      if (date) {
        const now = new Date();
        const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        
        if (isToday) {
          // Include current time for same-day filtering
          searchParams.append("date", now.toISOString());
        } else {
          // For future dates, just include the date
          searchParams.append("date", date.toISOString());
        }
      }
      
      searchParams.append("budget", budget[0].toString());
      searchParams.append("fulfillment", fulfillmentType);

      toast({
        title: "Searching...",
        description: "Finding the perfect flowers for you"
      });

      navigate({
        pathname: "/search",
        search: searchParams.toString()
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <ShineBorder 
      borderRadius={8}
      borderWidth={1}
      duration={14}
      color={["#D73459", "#eed2d8"]}
      className="w-full bg-[#eed2d8]/80 backdrop-blur-sm px-3 py-4 md:p-5 mt-0 md:mt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 relative">
          <label className="text-foreground text-xs font-medium">Location</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter suburb or postcode..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls="suburb-listbox"
            aria-activedescendant=""
          />
          {suggestions.length > 0 && (
            <ul
              id="suburb-listbox"
              role="listbox"
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.suburb}-${suggestion.postcode}`}
                  role="option"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setLocation(`${suggestion.suburb}, ${suggestion.state} ${suggestion.postcode}`);
                    setCoordinates([suggestion.latitude, suggestion.longitude]);
                    setSearchTerm(`${suggestion.suburb}, ${suggestion.state} ${suggestion.postcode}`);
                    setSuggestions([]);
                  }}
                >
                  {suggestion.suburb}, {suggestion.state} {suggestion.postcode}
                </li>
              ))}
            </ul>
          )}
          {isLoadingSuggestions && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <DateFilter 
          date={date} 
          setDate={setDate} 
        />
        <BudgetFilter 
          budget={budget} 
          setBudget={setBudget} 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <RainbowButton 
          onClick={() => handleSearch("delivery")}
          className="w-full text-sm h-[42px]"
          disabled={isSearching || !!(location && !coordinates)}
        >
          <Truck className="w-4 h-4 mr-2" />
          Search Delivery
        </RainbowButton>
        <Button 
          className="bg-white hover:bg-white/90 text-black text-sm h-[42px] w-full rounded-lg border border-black"
          onClick={() => handleSearch("pickup")}
          disabled={isSearching || !!(location && !coordinates)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Search Pickup
        </Button>
      </div>
    </ShineBorder>
  );
};