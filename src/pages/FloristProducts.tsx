import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { FloristProductList } from "@/components/florist-dashboard/FloristProductList";

const FloristProducts = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <FloristProductList />
      </div>
    </DashboardLayout>
  );
};

export default FloristProducts;