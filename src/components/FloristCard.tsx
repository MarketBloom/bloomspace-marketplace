import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FloristBanner } from "./florist-card/FloristBanner";
import { FloristInfo } from "./florist-card/FloristInfo";
import { SocialLinks } from "./florist-card/SocialLinks";

export interface FloristCardProps {
  florist: {
    id: string;
    store_name: string;
    address: string;
    about_text?: string;
    logo_url?: string;
    banner_url?: string;
    delivery_radius: number;
    delivery_fee: number;
    minimum_order_amount: number;
    operating_hours?: Record<string, { open: string; close: string }>;
    social_links?: {
      website?: string;
      instagram?: string;
      facebook?: string;
    };
  };
}

export const FloristCard = ({ florist }: FloristCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorite, isLoading: checkingFavorite } = useQuery({
    queryKey: ["favorite", user?.id, florist.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorite_florists")
        .select("id")
        .eq("customer_id", user?.id)
        .eq("florist_id", florist.id)
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
          florist_id: florist.id,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", user?.id, florist.id] });
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast({
        title: "Added to favorites",
        description: `${florist.store_name} has been added to your favorites`,
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
        .eq("florist_id", florist.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", user?.id, florist.id] });
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast({
        title: "Removed from favorites",
        description: `${florist.store_name} has been removed from your favorites`,
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
    navigate(`/florist/${florist.id}`);
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <FloristBanner
        bannerUrl={florist.banner_url}
        logoUrl={florist.logo_url}
        storeName={florist.store_name}
        isFavorite={!!favorite}
        isCheckingFavorite={checkingFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <FloristInfo
        storeName={florist.store_name}
        address={florist.address}
        aboutText={florist.about_text}
        operatingHours={florist.operating_hours}
        deliveryFee={florist.delivery_fee}
        deliveryRadius={florist.delivery_radius}
        minimumOrderAmount={florist.minimum_order_amount}
      />
      <SocialLinks links={florist.social_links} />
    </div>
  );
};