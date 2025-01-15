import { Header } from "@/components/Header";
import { DeliveryInfo } from "./DeliveryInfo";
import { SearchSidebar } from "./SearchSidebar";
import { SearchContent } from "./SearchContent";

interface SearchLayoutProps {
  userCoordinates: [number, number] | null;
}

export const SearchLayout = ({ userCoordinates }: SearchLayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="relative z-30">
        <Header />
        
        <div className="relative">
          <div className="relative z-10 lg:max-w-[1800px] mx-auto lg:px-4 pt-20">
            <DeliveryInfo />
            
            <div className="lg:grid lg:grid-cols-[260px_1fr] gap-4">
              <SearchSidebar />
              <SearchContent userCoordinates={userCoordinates} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};