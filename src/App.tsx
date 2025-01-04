import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Search from "@/pages/Search";
import Cart from "@/pages/Cart";
import ProductDetail from "@/pages/ProductDetail";
import CustomerDashboard from "@/pages/CustomerDashboard";
import FloristDashboard from "@/pages/FloristDashboard";
import BecomeFlorist from "@/pages/BecomeFlorist";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/florist-dashboard" element={<FloristDashboard />} />
            <Route path="/become-florist" element={<BecomeFlorist />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;