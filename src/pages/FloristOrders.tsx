import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { OrderManagement } from "@/components/florist-dashboard/OrderManagement";

const FloristOrders = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto">
          <OrderManagement floristId={user.id} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FloristOrders;