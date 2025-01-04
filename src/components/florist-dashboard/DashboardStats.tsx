import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { DollarSign, Package, Star, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  floristId: string;
}

export const DashboardStats = ({ floristId }: DashboardStatsProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['florist-stats', floristId],
    queryFn: async () => {
      // Get total orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id, total_amount')
        .eq('florist_id', floristId);

      if (ordersError) throw ordersError;

      // Get average rating
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('florist_id', floristId);

      if (reviewsError) throw reviewsError;

      // Get total products
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('id', { count: 'exact' })
        .eq('florist_id', floristId);

      if (productsError) throw productsError;

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const averageRating = reviews?.length 
        ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
        : '0.0';

      return {
        totalOrders,
        totalRevenue,
        averageRating,
        totalProducts: productsCount || 0
      };
    }
  });

  const statCards = [
    {
      title: "Total Orders",
      value: isLoading ? "-" : stats?.totalOrders.toString(),
      icon: <Package className="h-4 w-4 text-primary" />,
    },
    {
      title: "Total Revenue",
      value: isLoading ? "-" : `$${stats?.totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-4 w-4 text-primary" />,
    },
    {
      title: "Average Rating",
      value: isLoading ? "-" : stats?.averageRating,
      icon: <Star className="h-4 w-4 text-primary" />,
    },
    {
      title: "Total Products",
      value: isLoading ? "-" : stats?.totalProducts.toString(),
      icon: <TrendingUp className="h-4 w-4 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center space-x-2">
            {stat.icon}
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
          </div>
          <p className="text-2xl font-semibold mt-2">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};