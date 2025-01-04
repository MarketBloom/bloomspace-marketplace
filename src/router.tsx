import { createBrowserRouter } from "react-router-dom";
import BecomeFlorist from "./pages/BecomeFlorist";
import FloristDashboard from "./pages/FloristDashboard";
import StoreManagement from "./pages/StoreManagement";
import Index from "./pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/become-florist",
    element: <BecomeFlorist />,
  },
  {
    path: "/florist-dashboard",
    element: <FloristDashboard />,
  },
  {
    path: "/store-management",
    element: <StoreManagement />,
  },
]);

export default router;