import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { DeliverySettingsForm } from "@/components/become-florist/DeliverySettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import type { FloristProfile } from "@/types/florist";

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

  const handleDeliverySettingsSubmit = async (formData: any) => {
    if (!floristProfile || !user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({
          store_name: floristProfile.store_name,
          delivery_days: formData.deliveryDays,
          pickup_only_days: formData.pickupOnlyDays,
          delivery_radius: formData.deliveryRadius,
          delivery_fee: formData.deliveryFee,
          minimum_order_amount: formData.minimumOrder,
          delivery_cutoff_times: formData.cutoffTimes,
          delivery_time_frames: formData.timeFrames,
          same_day_enabled: formData.sameDayEnabled,
        })
        .eq("id", user.id);

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

  if (!user || !floristProfile) return null;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-3xl font-bold mb-2">Delivery Settings</h1>
          <p className="text-muted-foreground mb-8">
            Configure your delivery options, fees, and availability
          </p>

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
                  deliveryRadius: floristProfile.delivery_radius?.toString() || "5",
                  deliveryFee: floristProfile.delivery_fee?.toString() || "0",
                  minimumOrder: floristProfile.minimum_order_amount?.toString() || "0",
                  deliveryDays: floristProfile.delivery_days || [],
                  pickupOnlyDays: floristProfile.pickup_only_days || [],
                  cutoffTimes: floristProfile.delivery_cutoff_times || {},
                  sameDayEnabled: floristProfile.same_day_enabled || false,
                  timeFrames: floristProfile.delivery_time_frames || {
                    morning: false,
                    midday: false,
                    afternoon: false,
                  },
                }}
                setFormData={handleDeliverySettingsSubmit}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliverySettings;