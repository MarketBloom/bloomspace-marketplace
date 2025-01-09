import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Home, Bell, Settings, HelpCircle, Store } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

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

  const navigationItems = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      path: "/"
    },
    {
      title: "Browse",
      icon: <Store className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      path: "/search"
    },
    {
      title: "Notifications",
      icon: <Bell className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      path: "#"
    },
    {
      title: "Settings",
      icon: <Settings className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      path: "/settings"
    },
    {
      title: "Help",
      icon: <HelpCircle className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      path: "/help"
    }
  ];

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
            <Dock className="items-end pb-0 bg-transparent">
              {navigationItems.map((item, idx) => (
                <DockItem
                  key={idx}
                  className="aspect-square rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  onClick={() => handleNavigate(item.path)}
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
              ))}
            </Dock>
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