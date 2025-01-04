import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FloristSignup from "./pages/FloristSignup";
import CustomerSignup from "./pages/CustomerSignup";
import BecomeFlorist from "./pages/BecomeFlorist";
import FloristDashboard from "./pages/FloristDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import StoreManagement from "./pages/StoreManagement";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/florist-signup",
    element: <FloristSignup />,
  },
  {
    path: "/customer-signup",
    element: <CustomerSignup />,
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
    path: "/customer-dashboard",
    element: <CustomerDashboard />,
  },
  {
    path: "/store-management",
    element: <StoreManagement />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
]);