import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { SetupProgress } from "@/components/florist-dashboard/SetupProgress";
import { StoreVisibility } from "@/components/florist-dashboard/StoreVisibility";
import { DashboardStats } from "@/components/florist-dashboard/DashboardStats";
import { RecentOrders } from "@/components/florist-dashboard/RecentOrders";
import { Feature } from "@/components/ui/feature-section-with-bento-grid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FloristDashboard = () => {
  const { user } = useAuth();

  const { data: floristProfile } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto space-y-8">
          <Feature />
          
          {/* Header Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-1">
                  Welcome back, {floristProfile?.store_name || "New Florist"}
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your store today
                </p>
              </div>
              
              <SetupProgress progress={floristProfile?.setup_progress || 0} />
              
              <StoreVisibility
                storeId={user?.id}
                initialStatus={floristProfile?.store_status as "private" | "published"}
                onStatusChange={() => {}}
              />
            </div>
          </div>

          {/* Stats Section */}
          <DashboardStats floristId={user?.id} />

          {/* Recent Orders Section */}
          <RecentOrders floristId={user?.id} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FloristDashboard;