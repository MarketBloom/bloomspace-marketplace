import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import BecomeFlorist from "./pages/BecomeFlorist";
import FloristDashboard from "./pages/FloristDashboard";
import StoreManagement from "./pages/StoreManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
