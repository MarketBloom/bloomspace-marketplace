import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Home } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isHome, setIsHome] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user?.user_metadata?.role === 'florist') {
      navigate("/florist-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const toggleHomeAndDashboard = () => {
    if (isHome) {
      handleDashboardClick();
      setIsHome(false);
    } else {
      navigate("/");
      setIsHome(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleHomeAndDashboard}
            className="h-8 w-8"
          >
            <Home className={`h-4 w-4 transition-transform duration-200 ${!isHome ? 'rotate-180' : ''}`} />
          </Button>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="/search" className="text-xs text-gray-600 hover:text-primary transition-colors font-mono">
              Browse
            </a>
            <a href="/about" className="text-xs text-gray-600 hover:text-primary transition-colors font-mono">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-8 w-8"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-mono">
                {itemCount}
              </span>
            )}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" onClick={handleDashboardClick} className="text-xs h-8 font-mono">
                Dashboard
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="text-xs h-8 font-mono">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")} className="text-xs h-8 font-mono">
                Login
              </Button>
              <Button onClick={() => navigate("/customer-signup")} className="bg-primary hover:bg-primary/90 text-xs h-8 font-mono">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};