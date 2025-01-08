import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { OperatingHoursForm } from "@/components/become-florist/OperatingHoursForm";
import { DeliverySettingsForm } from "@/components/become-florist/DeliverySettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { FloristProfile } from "@/integrations/supabase/types";

interface OperatingHours {
  [key: string]: { open: string; close: string };
}

const DeliverySettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: floristProfile, refetch } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data as FloristProfile;
    },
    enabled: !!user,
  });

  const handleOperatingHoursSubmit = async (formData: { operatingHours: OperatingHours }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({ operating_hours: formData.operatingHours })
        .eq("id", user?.id);

      if (error) throw error;
      toast.success("Operating hours updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating operating hours:", error);
      toast.error("Failed to update operating hours");
    } finally {
      setLoading(false);
    }
  };

  const handleDeliverySettingsSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({
          delivery_days: formData.deliveryDays,
          pickup_only_days: formData.pickupOnlyDays,
          delivery_radius: formData.deliveryRadius,
          delivery_fee: formData.deliveryFee,
          minimum_order_amount: formData.minimumOrder,
          about_text: formData.aboutText,
          delivery_cutoff_times: formData.cutoffTimes
        })
        .eq("id", user?.id);

      if (error) throw error;
      toast.success("Delivery settings updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating delivery settings:", error);
      toast.error("Failed to update delivery settings");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const operatingHours = floristProfile?.operating_hours as OperatingHours || {};

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-3xl font-bold mb-2">Hours & Delivery Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your store's operating hours and delivery options
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
                <CardDescription>
                  Set your store's opening and closing times for each day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OperatingHoursForm
                  formData={{
                    operatingHours: operatingHours,
                  }}
                  setFormData={handleOperatingHoursSubmit}
                  onNext={() => {}}
                  onBack={() => {}}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>
                  Configure your delivery options, fees, and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DeliverySettingsForm
                  formData={{
                    aboutText: floristProfile?.about_text || "",
                    deliveryRadius: floristProfile?.delivery_radius?.toString() || "5",
                    deliveryFee: floristProfile?.delivery_fee?.toString() || "0",
                    minimumOrder: floristProfile?.minimum_order_amount?.toString() || "0",
                    deliveryDays: floristProfile?.delivery_days || [],
                    pickupOnlyDays: floristProfile?.pickup_only_days || [],
                    cutoffTimes: floristProfile?.delivery_cutoff_times || {}
                  }}
                  setFormData={handleDeliverySettingsSubmit}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliverySettings;