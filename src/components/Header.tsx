import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Home, Bell, Settings, HelpCircle } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import type { TabItem } from "@/components/ui/expandable-tabs";

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleDashboardClick = () => {
    const role = user?.user_metadata?.role;
    if (role === "florist") {
      navigate("/florist-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const navigationTabs: TabItem[] = [
    { title: "Browse", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" as const },
    { title: "Settings", icon: Settings },
    { title: "Help", icon: HelpCircle },
  ];

  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    
    const selectedTab = navigationTabs[index];
    if (selectedTab.type === "separator") return;
    
    switch (selectedTab.title) {
      case "Browse":
        handleNavigate("/search");
        break;
      case "Settings":
        handleNavigate("/settings");
        break;
      case "Help":
        handleNavigate("/help");
        break;
      default:
        break;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          <Button
            variant="ghost"
            className="font-semibold text-lg hover:bg-transparent hover:text-primary flex items-center gap-2"
            onClick={() => handleNavigate("/")}
          >
            <Home className="h-5 w-5" />
            MktBloom
          </Button>

          <div className="hidden md:block">
            <ExpandableTabs 
              tabs={navigationTabs} 
              onChange={handleTabChange}
              className="border-transparent shadow-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleDashboardClick}
                  className="text-sm font-medium"
                >
                  Dashboard
                </Button>
                <Button
                  variant="default"
                  onClick={() => signOut()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("/login")}
                  className="text-sm font-medium"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigate("/signup")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};