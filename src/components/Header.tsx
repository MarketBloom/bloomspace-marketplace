import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Search, User, Home } from "lucide-react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-8 w-8"
          >
            <Home className="h-4 w-4" />
          </Button>
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-sm text-gray-600 hover:text-black transition-colors"
              onClick={() => navigate("/search")}
            >
              Browse
            </Button>
            <Button
              variant="ghost"
              className="text-sm text-gray-600 hover:text-black transition-colors"
              onClick={() => navigate("/about")}
            >
              About
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/search")}
            className="h-8 w-8"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-8 w-8"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          {user ? (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleDashboardClick}
              className="h-8 w-8"
            >
              <User className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="default"
                onClick={() => navigate("/login")}
                className="h-8 px-3 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                Sign In
              </Button>
              <Button 
                variant="default"
                onClick={() => navigate("/signup")}
                className="h-8 px-3 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};