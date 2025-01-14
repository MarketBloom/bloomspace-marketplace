import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Clock, MapPin, Globe, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface FloristCardProps {
  id: string;
  storeName: string;
  address: string;
  aboutText?: string | null;
  bannerUrl?: string | null;
  logoUrl?: string | null;
  deliveryFee?: number | null;
  deliveryRadius?: number | null;
  minimumOrderAmount?: number | null;
  operatingHours?: Record<string, { open: string; close: string }> | null;
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  } | null;
}

export const FloristCard = ({
  id,
  storeName,
  address,
  aboutText,
  bannerUrl,
  logoUrl,
  deliveryFee,
  deliveryRadius,
  minimumOrderAmount,
  operatingHours,
  socialLinks,
}: FloristCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorite, isLoading: checkingFavorite } = useQuery({
    queryKey: ["favorite", user?.id, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorite_florists")
        .select("id")
        .eq("customer_id", user?.id)
        .eq("florist_id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("favorite_florists")
        .insert({
          customer_id: user?.id,
          florist_id: id,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", user?.id, id] });
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast({
        title: "Added to favorites",
        description: `${storeName} has been added to your favorites`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to favorites. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("favorite_florists")
        .delete()
        .eq("customer_id", user?.id)
        .eq("florist_id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", user?.id, id] });
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast({
        title: "Removed from favorites",
        description: `${storeName} has been removed from your favorites`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleToggleFavorite = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      return;
    }

    if (favorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const formatOperatingHours = () => {
    if (!operatingHours) return "Hours not specified";
    const today = new Date().toLocaleLowerCase();
    const dayHours = operatingHours[today];
    if (!dayHours) return "Closed today";
    return `Today: ${dayHours.open} - ${dayHours.close}`;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${storeName} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No banner image</span>
          </div>
        )}
        {logoUrl && (
          <div className="absolute -bottom-8 left-4">
            <img
              src={logoUrl}
              alt={`${storeName} logo`}
              className="w-16 h-16 rounded-full border-4 border-white object-cover bg-white"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-4 right-4 bg-white/80 hover:bg-white",
            favorite && "text-red-500 hover:text-red-600"
          )}
          onClick={handleToggleFavorite}
          disabled={checkingFavorite}
        >
          <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
        </Button>
      </div>

      <div className="p-4 pt-10">
        <h3 className="text-lg font-semibold mb-2">{storeName}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <p>{address}</p>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <p>{formatOperatingHours()}</p>
        </div>

        {aboutText && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{aboutText}</p>
        )}

        <div className="text-sm text-gray-600 space-y-1 mb-4">
          {deliveryFee !== null && (
            <p>Delivery Fee: ${deliveryFee?.toFixed(2)}</p>
          )}
          {deliveryRadius !== null && (
            <p>Delivery Radius: {deliveryRadius} km</p>
          )}
          {minimumOrderAmount !== null && (
            <p>Minimum Order: ${minimumOrderAmount?.toFixed(2)}</p>
          )}
        </div>

        {socialLinks && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <TooltipProvider>
              {socialLinks.website && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit website</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {socialLinks.instagram && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-600"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {socialLinks.facebook && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};
