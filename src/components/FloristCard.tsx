import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-white">
      <CardHeader className="p-3 pb-2">
        <h3 className="text-xs font-medium tracking-tight font-mono">{storeName}</h3>
        <p className="text-[10px] text-muted-foreground font-mono">
          {address}
        </p>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-3">
        {aboutText && (
          <p className="text-[10px] text-muted-foreground font-mono line-clamp-2">{aboutText}</p>
        )}
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