import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FloristBanner } from "./florist-card/FloristBanner";
import { FloristInfo } from "./florist-card/FloristInfo";
import { SocialLinks } from "./florist-card/SocialLinks";

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
  const navigate = useNavigate();
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

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    navigate(`/florist/${id}`);
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <FloristBanner
        bannerUrl={bannerUrl}
        logoUrl={logoUrl}
        storeName={storeName}
        isFavorite={!!favorite}
        isCheckingFavorite={checkingFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <FloristInfo
        storeName={storeName}
        address={address}
        aboutText={aboutText}
        operatingHours={operatingHours}
        deliveryFee={deliveryFee}
        deliveryRadius={deliveryRadius}
        minimumOrderAmount={minimumOrderAmount}
      />
      <SocialLinks links={socialLinks} />
    </div>
  );
};