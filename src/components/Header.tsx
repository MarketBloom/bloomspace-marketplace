import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();

  const handleDashboardClick = () => {
    if (user?.user_metadata?.role === 'florist') {
      navigate("/florist-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/d3c25b89-58e0-45d3-95af-7baa35c7d9fc.png" alt="Market Bloom" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/search" className="text-gray-600 hover:text-primary transition-colors">
              Browse
            </a>
            <a href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" onClick={handleDashboardClick}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")} className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};