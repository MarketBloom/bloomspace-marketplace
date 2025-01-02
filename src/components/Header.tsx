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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <a href="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/d3c25b89-58e0-45d3-95af-7baa35c7d9fc.png" alt="Market Bloom" className="h-6" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/search" className="text-gray-800 hover:text-black text-sm font-light tracking-wide transition-colors">
              Browse
            </a>
            <a href="/about" className="text-gray-800 hover:text-black text-sm font-light tracking-wide transition-colors">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-transparent"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {itemCount}
              </span>
            )}
          </Button>
          {user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleDashboardClick}
                className="text-sm font-light tracking-wide hover:bg-transparent hover:text-black transition-colors"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => signOut()}
                className="text-sm font-light tracking-wide hover:bg-transparent hover:text-black transition-colors"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="text-sm font-light tracking-wide hover:bg-transparent hover:text-black transition-colors"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/signup")} 
                className="bg-black hover:bg-black/90 text-white text-sm font-light tracking-wide rounded-none transition-colors"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};