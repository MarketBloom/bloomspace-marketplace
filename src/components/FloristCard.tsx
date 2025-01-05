import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Truck } from "lucide-react";

interface FloristCardProps {
  id: string;
  storeName: string;
  address: string;
  aboutText?: string;
  logoUrl?: string;
  bannerUrl?: string;
  deliveryFee?: number;
  minimumOrder?: number;
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
  minimumOrder,
  deliveryRadius
}: FloristCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-white">
      <div className="relative">
        {/* Banner Image */}
        <div className="h-40 w-full overflow-hidden">
          {bannerUrl ? (
            <img 
              src={bannerUrl} 
              alt={`${storeName} banner`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10" />
          )}
        </div>

        {/* Logo - Centered on banner */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white bg-white shadow-2xl">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${storeName} logo`}
                className="w-full h-full object-cover p-1 bg-white"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {storeName[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="pt-12 pb-4 px-4 space-y-4">
        {/* Store Info */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold tracking-tight font-mono">{storeName}</h3>
          <div className="flex items-center justify-center text-sm text-muted-foreground space-x-1">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="font-mono">{address}</span>
          </div>
          {aboutText && (
            <p className="text-sm text-muted-foreground font-mono line-clamp-2 mt-2">{aboutText}</p>
          )}
        </div>

        {/* Delivery Information */}
        <div className="space-y-2 border-t border-b py-3">
          {deliveryFee !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Truck className="h-4 w-4 mr-1" />
                <span>Delivery Fee:</span>
              </div>
              <span className="font-medium">
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
          )}
          
          {minimumOrder && minimumOrder > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Min. Order:</span>
              <span className="font-medium">${minimumOrder.toFixed(2)}</span>
            </div>
          )}
          
          {deliveryRadius && deliveryRadius > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Delivery Area:</span>
              <span className="font-medium">{deliveryRadius}km radius</span>
            </div>
          )}
        </div>

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