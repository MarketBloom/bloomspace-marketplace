import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FloristCard } from "@/components/FloristCard";

interface FavoriteFloristsProps {
  favorites: any[];
  isLoading: boolean;
}

export const FavoriteFlorists = ({ favorites, isLoading }: FavoriteFloristsProps) => {
  if (isLoading) {
    return <div>Loading favorites...</div>;
  }

  if (favorites?.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>You haven't saved any florists as favorites yet.</p>
          <Button className="mt-4" onClick={() => window.location.href = "/search"}>
            Browse Florists
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites?.map((favorite) => (
        <FloristCard
          key={favorite.florist_id}
          florist={{
            id: favorite.florist_profiles.id,
            store_name: favorite.florist_profiles.store_name,
            address: favorite.florist_profiles.address,
            about_text: favorite.florist_profiles.about_text,
            banner_url: favorite.florist_profiles.banner_url,
            logo_url: favorite.florist_profiles.logo_url,
            delivery_fee: favorite.florist_profiles.delivery_fee,
            delivery_radius: favorite.florist_profiles.delivery_radius,
            minimum_order_amount: favorite.florist_profiles.minimum_order_amount,
            operating_hours: favorite.florist_profiles.operating_hours,
            social_links: favorite.florist_profiles.social_links
          }}
        />
      ))}
    </div>
  );
};