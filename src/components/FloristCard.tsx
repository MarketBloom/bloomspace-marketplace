import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      {/* Banner Image */}
      <div className="relative h-32 w-full overflow-hidden">
        {bannerUrl ? (
          <img 
            src={bannerUrl} 
            alt={`${storeName} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10" />
        )}
        {/* Logo overlay */}
        <div className="absolute -bottom-8 left-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white bg-white shadow-sm">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${storeName} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xl font-bold text-muted-foreground">
                  {storeName[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="p-4 pt-10 pb-2 space-y-2">
        <h3 className="text-sm font-semibold tracking-tight font-mono">{storeName}</h3>
        <div className="flex items-center text-xs text-muted-foreground space-x-1">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate font-mono">{address}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        {aboutText && (
          <p className="text-xs text-muted-foreground font-mono line-clamp-2">{aboutText}</p>
        )}

        {/* Delivery Information */}
        <div className="space-y-2 border-t pt-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-muted-foreground">
              <Truck className="h-3 w-3 mr-1" />
              <span>Delivery Fee:</span>
            </div>
            <span className="font-medium">${deliveryFee?.toFixed(2) || 'Free'}</span>
          </div>
          
          {minimumOrder && minimumOrder > 0 && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Min. Order:</span>
              <span className="font-medium">${minimumOrder.toFixed(2)}</span>
            </div>
          )}
          
          {deliveryRadius && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Delivery Area:</span>
              <span className="font-medium">{deliveryRadius}km radius</span>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate(`/florist/${id}`)}
          className="w-full text-xs h-8 font-mono"
        >
          View Products
        </Button>
      </CardContent>
    </Card>
  );
};