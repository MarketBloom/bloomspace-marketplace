import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Package,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/florist-dashboard",
    },
    {
      icon: Store,
      label: "Manage Store",
      path: "/store-management",
    },
    {
      icon: Package,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: CreditCard,
      label: "Payments",
      path: "/payments",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-20 h-full bg-white border-r border-gray-200 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-24 flex items-center justify-center border-b border-gray-100">
            <h1 className={cn("font-semibold", collapsed ? "hidden" : "block")}>
              Market Bloom
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 hover:bg-gray-100",
                      collapsed && "justify-center px-2"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span
                      className={cn(
                        "transition-opacity",
                        collapsed ? "hidden" : "block"
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse Button */}
          <div className="border-t border-gray-100 p-4">
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        {children}
      </div>
    </div>
  );
};