import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FloristBanner } from "./florist-card/FloristBanner";
import { FloristInfo } from "./florist-card/FloristInfo";
import { DeliveryInfo } from "./florist-card/DeliveryInfo";

interface FloristCardProps {
  id: string;
  storeName: string;
  address: string;
  aboutText?: string;
  logoUrl?: string;
  bannerUrl?: string;
  deliveryFee?: number;
  deliveryRadius?: number;
}

export const FloristCard = ({ 
  id, 
  storeName, 
  address, 
  aboutText,
  logoUrl,
  bannerUrl,
  deliveryFee,
  deliveryRadius
}: FloristCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-apple-hover shadow-apple border-0 bg-accent">
      <FloristBanner 
        bannerUrl={bannerUrl}
        logoUrl={logoUrl}
        storeName={storeName}
      />

      <CardContent className="pt-12 pb-4 px-4 space-y-4 bg-white">
        <FloristInfo 
          storeName={storeName}
          address={address}
          aboutText={aboutText}
        />

        <DeliveryInfo 
          deliveryFee={deliveryFee}
          deliveryRadius={deliveryRadius}
        />

        <Button 
          variant="outline" 
          onClick={() => navigate(`/florist/${id}`)}
          className="w-full text-sm h-10 font-mono"
        >
          View Products
        </Button>
      </CardContent>
    </Card>
  );
};