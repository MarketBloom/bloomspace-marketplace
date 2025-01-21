import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { StoreSettingsForm } from "@/components/store-management/StoreSettingsForm";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import type { FloristProfile } from "@/types/florist";

const StoreManagement = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: floristProfile, refetch } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();

      if (error) throw error;
      return data as FloristProfile;
    },
    enabled: !!user,
  });

  const handleStoreSettingsSubmit = async (formData: Record<string, string>) => {
    if (!floristProfile || !user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({
          ...formData,
          store_name: formData.store_name || floristProfile.store_name,
          address: formData.address || floristProfile.address
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Store settings updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating store settings:", error);
      toast.error("Failed to update store settings");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !floristProfile) return null;

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
                formData={floristProfile}
                setFormData={handleStoreSettingsSubmit}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoreManagement;