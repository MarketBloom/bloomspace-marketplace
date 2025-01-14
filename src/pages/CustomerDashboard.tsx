import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Clock, Star, Heart } from "lucide-react";
import { OrderStatusTracker } from "@/components/order/OrderStatusTracker";
import { OrderStatus } from "@/types/order";
import { FloristCard } from "@/components/FloristCard";
import { LoyaltyCard } from "@/components/loyalty/LoyaltyCard";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter(order => 
                  ["pending", "confirmed", "preparing", "out_for_delivery"].includes(order.status)
                ).length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Florists</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favorites?.length || 0}</div>
            </CardContent>
          </Card>

          <LoyaltyCard />
        </div>

        {/* Favorite Florists Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Favorite Florists</h2>
          {favoritesLoading ? (
            <div>Loading favorites...</div>
          ) : favorites?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>You haven't saved any florists as favorites yet.</p>
                <Button className="mt-4" onClick={() => window.location.href = "/search"}>
                  Browse Florists
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites?.map((favorite) => (
                <FloristCard
                  key={favorite.florist_id}
                  id={favorite.florist_profiles.id}
                  storeName={favorite.florist_profiles.store_name}
                  address={favorite.florist_profiles.address}
                  aboutText={favorite.florist_profiles.about_text}
                  bannerUrl={favorite.florist_profiles.banner_url}
                  logoUrl={favorite.florist_profiles.logo_url}
                  deliveryFee={favorite.florist_profiles.delivery_fee}
                  deliveryRadius={favorite.florist_profiles.delivery_radius}
                  minimumOrderAmount={favorite.florist_profiles.minimum_order_amount}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Orders</h2>
          {ordersLoading ? (
            <div>Loading orders...</div>
          ) : orders?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>You haven't placed any orders yet.</p>
                <Button className="mt-4" onClick={() => window.location.href = "/search"}>
                  Browse Flowers
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders?.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                        <p className="text-sm text-muted-foreground">
                          From: {order.florist_profiles?.store_name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total_amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <OrderStatusTracker
                      orderId={order.id}
                      currentStatus={order.status as OrderStatus}
                      className="mb-6"
                    />

                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.products?.title} × {item.quantity}</span>
                          <span>${item.price_at_time}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      {order.status === "delivered" && (
                        <Button variant="outline">Leave Review</Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
