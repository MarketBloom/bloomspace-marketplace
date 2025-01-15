import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryDaysSection } from "./delivery-settings/DeliveryDaysSection";
import { TimeFramesSection } from "./delivery-settings/TimeFramesSection";
import { OperatingHoursSection } from "./delivery-settings/OperatingHoursSection";
import { BasicDeliverySettings } from "./delivery-settings/BasicDeliverySettings";
import { SaveChangesButton } from "./delivery-settings/SaveChangesButton";
import { UnsavedChangesAlert } from "./delivery-settings/UnsavedChangesAlert";
import { toast } from "sonner";
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
    timeFrameNames?: {
      morning?: string;
      midday?: string;
      afternoon?: string;
    };
    timeFrameHours?: {
      morning?: { start: string; end: string };
      midday?: { start: string; end: string };
      afternoon?: { start: string; end: string };
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
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [attemptedPath, setAttemptedPath] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const handleLocationChange = (e: PopStateEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        setShowExitDialog(true);
        setAttemptedPath(window.location.pathname);
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleLocationChange);
    };
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

  const handleBasicSettingsChange = (field: string, value: string) => {
    const updatedData = {
      ...draftData,
      [field]: value,
    };
    setDraftData(updatedData);
    setHasUnsavedChanges(true);
  };

  const handleLeaveWithoutSaving = () => {
    setHasUnsavedChanges(false);
    setShowExitDialog(false);
    if (attemptedPath) {
      window.location.href = attemptedPath;
    }
  };

  return (
    <div className="space-y-4 relative pb-20">
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
          You have unsaved changes. Don't forget to save before leaving!
        </div>
      )}

      <UnsavedChangesAlert
        showDialog={showExitDialog}
        setShowDialog={setShowExitDialog}
        onLeave={handleLeaveWithoutSaving}
      />

      <BasicDeliverySettings
        deliveryRadius={draftData.deliveryRadius}
        deliveryFee={draftData.deliveryFee}
        minimumOrder={draftData.minimumOrder}
        onChange={handleBasicSettingsChange}
      />

      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <OperatingHoursSection 
            formData={draftData}
            setFormData={(data) => {
              setDraftData(data);
              setHasUnsavedChanges(true);
            }}
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
            setFormData={(data) => {
              setDraftData(data);
              setHasUnsavedChanges(true);
            }}
          />
          <div className="pt-4 border-t">
            <CardTitle className="text-base mb-4">Non Same-Day Delivery Options</CardTitle>
            <TimeFramesSection 
              formData={draftData}
              setFormData={(data) => {
                setDraftData(data);
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {hasUnsavedChanges && (
        <SaveChangesButton
          loading={loading}
          saveSuccess={saveSuccess}
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={handleSave}
        />
      )}
    </div>
  );
};