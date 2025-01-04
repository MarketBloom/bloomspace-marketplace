import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { SetupProgress } from "@/components/florist-dashboard/SetupProgress";
import { StoreVisibility } from "@/components/florist-dashboard/StoreVisibility";
import { DashboardStats } from "@/components/florist-dashboard/DashboardStats";
import { RecentOrders } from "@/components/florist-dashboard/RecentOrders";
import { ProductManagement } from "@/components/florist-dashboard/ProductManagement";
import { Button } from "@/components/ui/button";

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

  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("florist_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: orders } = useQuery({
    queryKey: ["floristOrders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          profiles:customer_id (full_name),
          order_items (
            *,
            products (title)
          )
        `)
        .eq("florist_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleStatusChange = (newStatus: "private" | "published") => {
    // Refetch data after status change
    refetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Store Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {floristProfile?.store_name || "New Florist"}
            </p>
          </div>
          <Button onClick={() => window.location.href = "/store-settings"}>
            Store Settings
          </Button>
        </div>

        <div className="space-y-8">
          {/* Setup Progress */}
          <SetupProgress progress={floristProfile?.setup_progress || 0} />

          {/* Store Visibility Control */}
          <StoreVisibility
            storeId={user?.id || ""}
            initialStatus={floristProfile?.store_status as "private" | "published"}
            onStatusChange={handleStatusChange}
          />

          {/* Dashboard Stats */}
          <DashboardStats
            orderCount={orders?.length || 0}
            productCount={products?.length || 0}
            revenue={orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0}
            rating={4.8}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <RecentOrders orders={orders || []} />

            {/* Product Management */}
            <ProductManagement
              products={products || []}
              floristId={user?.id || ""}
              onProductAdded={refetchProducts}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FloristDashboard;