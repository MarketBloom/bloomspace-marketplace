import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { DeliverySettingsForm } from "@/components/become-florist/DeliverySettingsForm";
import { Card, CardContent } from "@/components/ui/card";
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
        .maybeSingle();

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
          delivery_radius: parseFloat(formData.deliveryRadius) || 5.0,
          delivery_fee: parseFloat(formData.deliveryFee) || 0.0,
          minimum_order_amount: parseFloat(formData.minimumOrder) || 0.0,
          delivery_days: formData.deliveryDays,
          pickup_only_days: formData.pickupOnlyDays,
          delivery_cutoff_times: formData.cutoffTimes,
          same_day_enabled: true,
          operating_hours: formData.operatingHours,
          store_name: floristProfile.store_name, // Add required fields
          address: floristProfile.address
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
      <div className="p-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-2">Delivery Settings</h1>
          <p className="text-muted-foreground mb-8">
            Configure your delivery options, fees, and availability
          </p>

          <Card>
            <CardContent className="p-6">
              <DeliverySettingsForm
                formData={{
                  deliveryRadius: floristProfile.delivery_radius?.toString() || "5",
                  deliveryFee: floristProfile.delivery_fee?.toString() || "0",
                  minimumOrder: floristProfile.minimum_order_amount?.toString() || "0",
                  deliveryDays: floristProfile.delivery_days || [],
                  pickupOnlyDays: floristProfile.pickup_only_days || [],
                  cutoffTimes: floristProfile.delivery_cutoff_times || {},
                  sameDayEnabled: true,
                  timeFrames: floristProfile.delivery_time_frames || {
                    morning: false,
                    midday: false,
                    afternoon: false,
                  },
                  operatingHours: floristProfile.operating_hours || {},
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