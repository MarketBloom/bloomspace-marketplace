import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryDaysSection } from "./delivery-settings/DeliveryDaysSection";
import { TimeFramesSection } from "./delivery-settings/TimeFramesSection";
import { OperatingHoursSection } from "./delivery-settings/OperatingHoursSection";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { useState } from "react";

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
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    const promise = new Promise((resolve, reject) => {
      setFormData(formData);
      setTimeout(resolve, 1000);
    });

    toast.promise(promise, {
      loading: 'Saving changes...',
      success: () => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        return 'Delivery settings updated successfully';
      },
      error: 'Failed to save changes',
    });
  };

  const updateFormData = (newData: Partial<DeliverySettingsFormProps['formData']>) => {
    const updatedData = {
      ...formData,
      ...newData,
    };
    setFormData(updatedData);
  };

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
              onChange={(e) => updateFormData({ deliveryRadius: e.target.value })}
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
              onChange={(e) => updateFormData({ deliveryFee: e.target.value })}
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
              onChange={(e) => updateFormData({ minimumOrder: e.target.value })}
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
            setFormData={updateFormData}
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
            setFormData={updateFormData}
          />
          <div className="pt-4 border-t">
            <CardTitle className="text-base mb-4">Non Same-Day Delivery Options</CardTitle>
            <TimeFramesSection 
              formData={formData}
              setFormData={updateFormData}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={loading}
          className={`min-w-[120px] transition-all duration-300 ${
            saveSuccess 
              ? "bg-green-500 hover:bg-green-600" 
              : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
};