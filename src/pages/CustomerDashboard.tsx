import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FavoriteFlorists } from "@/components/dashboard/FavoriteFlorists";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

const CustomerDashboard = () => {
  const { user } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          florist_profiles:florist_id (store_name),
          order_items (
            *,
            products (title, price)
          )
        `)
        .eq("customer_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorite_florists")
        .select(`
          *,
          florist_profiles:florist_id (
            id,
            store_name,
            address,
            about_text,
            delivery_fee,
            delivery_radius,
            minimum_order_amount,
            banner_url,
            logo_url
          )
        `)
        .eq("customer_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const activeOrders = orders?.filter(order => 
    ["pending", "confirmed", "preparing", "out_for_delivery"].includes(order.status)
  ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <DashboardStats
          totalOrders={orders?.length || 0}
          activeOrders={activeOrders}
          favoritesCount={favorites?.length || 0}
        />

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Favorite Florists</h2>
          <FavoriteFlorists
            favorites={favorites || []}
            isLoading={favoritesLoading}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Orders</h2>
          <RecentOrders
            orders={orders || []}
            isLoading={ordersLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;