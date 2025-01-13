import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FloristBanner } from "./florist-card/FloristBanner";
import { FloristInfo } from "./florist-card/FloristInfo";
import { DeliveryInfo } from "./florist-card/DeliveryInfo";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface FloristCardProps {
  id: string;
  storeName: string;
  address: string;
  aboutText?: string;
  logoUrl?: string;
  bannerUrl?: string;
  deliveryFee?: number;
  deliveryRadius?: number;
  minimumOrderAmount?: number;
}

export const FloristCard = ({ 
  id, 
  storeName, 
  address, 
  aboutText,
  logoUrl,
  bannerUrl,
  deliveryFee,
  deliveryRadius,
  minimumOrderAmount
}: FloristCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  // Query to check if florist is favorited
  const { data: isFavorited, refetch: refetchFavorite } = useQuery({
    queryKey: ['favorite', id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from('favorite_florists')
        .select('id')
        .eq('customer_id', user.id)
        .eq('florist_id', id)
        .single();
      return !!data;
    },
    enabled: !!user,
  });

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    setIsUpdating(true);
    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorite_florists')
          .delete()
          .eq('customer_id', user.id)
          .eq('florist_id', id);

        if (error) throw error;
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorite_florists')
          .insert({
            customer_id: user.id,
            florist_id: id
          });

        if (error) throw error;
        toast.success("Added to favorites");
      }
      refetchFavorite();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorites");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-apple-hover shadow-apple border-0 bg-white">
      <FloristBanner 
        bannerUrl={bannerUrl}
        logoUrl={logoUrl}
        storeName={storeName}
      />

      <CardContent className="pt-12 pb-4 px-4 space-y-4">
        <FloristInfo 
          storeName={storeName}
          address={address}
          aboutText={aboutText}
        />

        <DeliveryInfo 
          deliveryFee={deliveryFee}
          deliveryRadius={deliveryRadius}
          minimumOrderAmount={minimumOrderAmount}
        />

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/florist/${id}`)}
            className="flex-1 text-sm h-10 font-mono"
          >
            View Products
          </Button>
          <Button
            variant="outline"
            onClick={toggleFavorite}
            disabled={isUpdating}
            className="w-10 h-10 p-0"
          >
            <Heart 
              className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};