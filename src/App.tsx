import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "@/contexts/CartContext"
import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Search from "./pages/Search"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CustomerDashboard from "./pages/CustomerDashboard"
import FloristDashboard from "./pages/FloristDashboard"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"

console.log('App.tsx initializing...', new Date().toISOString())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

const App = () => {
  console.log('App component rendering...', new Date().toISOString())
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/florist-dashboard" element={<FloristDashboard />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Toaster />
            <Sonner />
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App