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
        <h3 className="font-semibold text-lg">{storeName}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{address}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {aboutText && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{aboutText}</p>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate(`/florist/${id}`)}
          className="w-full"
        >
          View Products
        </Button>
      </CardContent>
    </Card>
  );
};