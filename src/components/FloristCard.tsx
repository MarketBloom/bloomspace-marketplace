import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FloristCardProps {
  id: string;
  storeName: string;
  address: string;
  aboutText?: string;
}

export const FloristCard = ({ 
  id, 
  storeName, 
  address, 
  aboutText 
}: FloristCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2">
        <h3 className="text-sm font-semibold">{storeName}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{address}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {aboutText && (
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">{aboutText}</p>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate(`/florist/${id}`)}
          className="w-full text-xs"
        >
          View Products
        </Button>
      </CardContent>
    </Card>
  );
};