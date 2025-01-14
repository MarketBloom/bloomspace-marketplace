import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryDaysSection } from "./delivery-settings/DeliveryDaysSection";
import { TimeFramesSection } from "./delivery-settings/TimeFramesSection";
import { OperatingHoursSection } from "./delivery-settings/OperatingHoursSection";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { useState, useEffect } from "react";

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
  formData: initialFormData,
  setFormData: saveFormData,
  loading,
}: DeliverySettingsFormProps) => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [draftData, setDraftData] = useState(initialFormData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Set up beforeunload event handler
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = async () => {
    const promise = new Promise((resolve, reject) => {
      saveFormData(draftData);
      setTimeout(resolve, 1000);
    });

    toast.promise(promise, {
      loading: 'Saving changes...',
      success: () => {
        setSaveSuccess(true);
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveSuccess(false), 2000);
        return 'Delivery settings updated successfully';
      },
      error: 'Failed to save changes',
    });
  };

  const updateDraftData = (newData: Partial<DeliverySettingsFormProps['formData']>) => {
    const updatedData = {
      ...draftData,
      ...newData,
    };
    console.log('Updating draft data:', updatedData);
    setDraftData(updatedData);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="space-y-4">
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          You have unsaved changes. Don't forget to save before leaving!
        </div>
      )}

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
              value={draftData.deliveryRadius}
              onChange={(e) => updateDraftData({ deliveryRadius: e.target.value })}
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
              value={draftData.deliveryFee}
              onChange={(e) => updateDraftData({ deliveryFee: e.target.value })}
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
              value={draftData.minimumOrder}
              onChange={(e) => updateDraftData({ minimumOrder: e.target.value })}
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
            formData={draftData}
            setFormData={updateDraftData}
          />
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Delivery Availability & Cutoff Times</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <DeliveryDaysSection 
            formData={draftData}
            setFormData={updateDraftData}
          />
          <div className="pt-4 border-t">
            <CardTitle className="text-base mb-4">Non Same-Day Delivery Options</CardTitle>
            <TimeFramesSection 
              formData={draftData}
              setFormData={updateDraftData}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={loading || !hasUnsavedChanges}
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