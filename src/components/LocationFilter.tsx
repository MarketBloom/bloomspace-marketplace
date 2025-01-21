import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LocationFilterProps {
  location: string;
  setLocation: (location: string) => void;
  onCoordsChange?: (coords: [number, number] | null) => void;
}

export const LocationFilter = ({ 
  location, 
  setLocation, 
  onCoordsChange 
}: LocationFilterProps) => {
  const [inputValue, setInputValue] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
      return;
    }

    try {
      setIsLoading(true);
      
      const { data: secretData, error: secretError } = await supabase
        .rpc('get_secret', { secret_name: 'GOOGLE_MAPS_API_KEY' });

      if (secretError) {
        console.error('Error fetching API key:', secretError);
        toast({
          title: "Error",
          description: "Failed to load location search. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      if (!secretData || !secretData[0]?.secret) {
        console.error('API key not found in response:', secretData);
        toast({
          title: "Configuration Error",
          description: "Location search is not properly configured.",
          variant: "destructive"
        });
        return;
      }

      const apiKey = secretData[0].secret;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputValue)}, Australia&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const formattedAddress = result.formatted_address;
        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;

        setLocation(formattedAddress);
        if (onCoordsChange) {
          onCoordsChange([lat, lng]);
        }
      } else {
        toast({
          title: "Location Not Found",
          description: "Please try a different location search.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      toast({
        title: "Error",
        description: "Failed to process location search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setLocation('');
      if (onCoordsChange) {
        onCoordsChange(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter suburb or postcode..."
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full pl-8 h-[42px] bg-white/90 border border-black text-xs ${isLoading ? 'opacity-70' : ''}`}
        />
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
      </div>
    </form>
  );
};