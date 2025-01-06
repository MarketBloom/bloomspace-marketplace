import { Home, LayoutDashboard, Store, Package, CreditCard } from "lucide-react";

export const getDashboardMenuItems = (handleHomeClick: () => void, isHome: boolean) => [
  {
    icon: Home,
    label: "Homepage",
    path: "/",
    className: `transition-transform duration-200 ${!isHome ? 'rotate-180' : ''}`
  },
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