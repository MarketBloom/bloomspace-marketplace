import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeliveryDaysSection } from "./delivery-settings/DeliveryDaysSection";
import { TimeFramesSection } from "./delivery-settings/TimeFramesSection";

interface DeliverySettingsFormProps {
  formData: {
    deliveryRadius: string;
    deliveryFee: string;
    minimumOrder: string;
    deliveryDays: string[];
    pickupOnlyDays: string[];
    cutoffTimes: {
      [key: string]: string;
    };
    sameDayEnabled: boolean;
    timeFrames: {
      morning: boolean;
      midday: boolean;
      afternoon: boolean;
    };
  };
  setFormData: (data: any) => void;
  loading: boolean;
}

export const DeliverySettingsForm = ({
  formData,
  setFormData,
  loading,
}: DeliverySettingsFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
        <Input
          id="deliveryRadius"
          type="number"
          min="0"
          value={formData.deliveryRadius}
          onChange={(e) => setFormData({ ...formData, deliveryRadius: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
        <Input
          id="deliveryFee"
          type="number"
          min="0"
          step="0.01"
          value={formData.deliveryFee}
          onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="minimumOrder">Minimum Order Amount ($)</Label>
        <Input
          id="minimumOrder"
          type="number"
          min="0"
          step="0.01"
          value={formData.minimumOrder}
          onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
          required
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <TimeFramesSection 
            formData={formData}
            setFormData={setFormData}
          />
        </CardContent>
      </Card>

      <DeliveryDaysSection 
        formData={formData}
        setFormData={setFormData}
      />

      <div className="flex justify-end">
        <Button onClick={() => setFormData(formData)} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};