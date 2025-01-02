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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-16">
            <a href="/" className="flex items-center">
              <img src="/lovable-uploads/d3c25b89-58e0-45d3-95af-7baa35c7d9fc.png" alt="Market Bloom" className="h-8" />
            </a>
            <nav className="hidden md:flex items-center space-x-12">
              <a href="/search" className="text-primary hover:text-primary/80 transition-colors text-sm tracking-widest font-light">
                Browse
              </a>
              <a href="/about" className="text-primary hover:text-primary/80 transition-colors text-sm tracking-widest font-light">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-8">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleDashboardClick}
                  className="text-sm tracking-widest font-light"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-sm tracking-widest font-light"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-sm tracking-widest font-light"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate("/signup")} 
                  className="bg-black hover:bg-black/90 text-sm tracking-widest font-light"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};