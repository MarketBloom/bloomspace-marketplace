import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BasicDeliverySettingsProps {
  deliveryRadius: string;
  deliveryFee: string;
  minimumOrder: string;
  onChange: (field: string, value: string) => void;
}

export const BasicDeliverySettings = ({
  deliveryRadius,
  deliveryFee,
  minimumOrder,
  onChange,
}: BasicDeliverySettingsProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Basic Delivery Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="deliveryRadius" className="text-sm">Delivery Radius (km)</Label>
          <Input
            id="deliveryRadius"
            type="number"
            min="0"
            value={deliveryRadius}
            onChange={(e) => onChange('deliveryRadius', e.target.value)}
            required
            className="h-8"
          />
        </div>
        <div>
          <Label htmlFor="deliveryFee" className="text-sm">Delivery Fee ($)</Label>
          <Input
            id="deliveryFee"
            type="number"
            min="0"
            step="0.01"
            value={deliveryFee}
            onChange={(e) => onChange('deliveryFee', e.target.value)}
            required
            className="h-8"
          />
        </div>
        <div>
          <Label htmlFor="minimumOrder" className="text-sm">Minimum Order ($)</Label>
          <Input
            id="minimumOrder"
            type="number"
            min="0"
            step="0.01"
            value={minimumOrder}
            onChange={(e) => onChange('minimumOrder', e.target.value)}
            required
            className="h-8"
          />
        </div>
      </CardContent>
    </Card>
  );
};