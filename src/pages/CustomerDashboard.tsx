import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FavoriteFlorists } from "@/components/dashboard/FavoriteFlorists";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { GiftCardSection } from "@/components/loyalty/GiftCardSection";
import { LoyaltyCard } from "@/components/loyalty/LoyaltyCard";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="grid gap-8">
          <DashboardStats />
          
          <div className="grid gap-8 lg:grid-cols-2">
            <LoyaltyCard />
            <GiftCardSection />
          </div>
          
          <FavoriteFlorists />
          <RecentOrders />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;