import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { StoreSettingsForm } from "@/components/store-management/StoreSettingsForm";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { useFloristProfile } from "@/hooks/useFloristProfile";

const StoreManagement = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const {
    floristProfile,
    isLoading: isLoadingProfile,
    error,
    updateProfile,
  } = useFloristProfile(user?.id);

  const handleStoreSettingsSubmit = async () => {
    if (!floristProfile || !user) return;
    
    setLoading(true);
    try {
      await updateProfile.mutateAsync(floristProfile);
      toast.success("Store settings updated successfully");
    } catch (error) {
      console.error("Error updating store settings:", error);
      toast.error("Failed to update store settings");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !floristProfile) return null;
  if (error) {
    toast.error("Failed to load store settings");
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-2">Store Management</h1>
          <p className="text-muted-foreground mb-8">
            Configure your store settings and information
          </p>

          <Card>
            <CardContent className="p-6">
              <StoreSettingsForm
                initialData={floristProfile}
                onSubmit={handleStoreSettingsSubmit}
                loading={loading || isLoadingProfile}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoreManagement;