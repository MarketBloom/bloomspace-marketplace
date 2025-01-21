import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedFlorists } from "@/components/FeaturedFlorists";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useGoogleMaps } from "@/hooks/use-google-maps";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [location, setLocation] = useState("");

  const { isLoaded: mapsLoaded, geocode } = useGoogleMaps();

  const { data: florists, isLoading: isLoadingFlorists } = useQuery({
    queryKey: ['florists', coordinates],
    queryFn: async () => {
      if (!coordinates) return [];
      
      console.log("Filtering florists by delivery radius...");
      
      const { data: florists, error } = await supabase
        .from('florist_profiles')
        .select('*')
        .eq('store_status', 'published');

      if (error) throw error;

      // Filter florists by delivery radius
      return florists.filter(florist => {
        if (!florist.coordinates || !coordinates) return false;
        
        try {
          // Ensure coordinates are properly parsed
          const floristCoords = typeof florist.coordinates === 'string' 
            ? JSON.parse(florist.coordinates) 
            : florist.coordinates;

          // Calculate distance using PostGIS function
          const distance = window.calculate_distance(
            coordinates[0],
            coordinates[1],
            floristCoords[0],
            floristCoords[1]
          );

          console.log(`Distance to ${florist.store_name}: ${distance}km`);
          console.log(`Delivery radius for ${florist.store_name}: ${florist.delivery_radius}km`);
          
          return distance <= (florist.delivery_radius || 5);
        } catch (err) {
          console.error(`Error calculating distance for ${florist.store_name}:`, err);
          return false;
        }
      });
    },
    enabled: !!coordinates
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['featured_products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          florist_profiles (
            store_name,
            address,
            delivery_cutoff,
            delivery_start_time,
            delivery_end_time,
            operating_hours,
            coordinates,
            delivery_radius
          ),
          product_sizes (
            id,
            name,
            price_adjustment,
            images
          )
        `)
        .eq('in_stock', true)
        .eq('is_hidden', false)
        .limit(6);

      if (error) throw error;
      return data;
    }
  });

  const handleSearch = async () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search",
        variant: "destructive"
      });
      return;
    }

    try {
      const coords = await geocode(location);
      if (coords) {
        navigate(`/search?location=${encodeURIComponent(location)}`);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: "Location Error",
        description: "Could not find the specified location. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero 
        location={location} 
        setLocation={setLocation} 
        onSearch={handleSearch}
        isLoading={false}
      />
      <FeaturedFlorists florists={florists || []} isLoading={isLoadingFlorists} />
      <FeaturedProducts 
        products={products || []} 
        isLoading={isLoadingProducts}
        navigate={navigate}
      />
    </div>
  );
};

export default Index;