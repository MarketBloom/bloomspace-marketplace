import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryDaysSection } from "./delivery-settings/DeliveryDaysSection";
import { TimeFramesSection } from "./delivery-settings/TimeFramesSection";
import { OperatingHoursSection } from "./delivery-settings/OperatingHoursSection";

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
    operatingHours: {
      [key: string]: { open: string; close: string };
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
    <div className="space-y-4">
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
              value={formData.deliveryRadius}
              onChange={(e) => setFormData({ ...formData, deliveryRadius: e.target.value })}
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
              value={formData.deliveryFee}
              onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
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
              value={formData.minimumOrder}
              onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
              required
              className="h-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <OperatingHoursSection 
            formData={formData}
            setFormData={setFormData}
          />
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Delivery Availability & Cutoff Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <DeliveryDaysSection 
            formData={formData}
            setFormData={setFormData}
          />
          <div className="pt-4 border-t">
            <CardTitle className="text-base mb-4">Non Same-Day Delivery Options</CardTitle>
            <TimeFramesSection 
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setFormData(formData)} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};