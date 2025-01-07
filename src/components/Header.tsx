import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo/Home */}
          <Button
            variant="ghost"
            className="font-semibold text-lg hover:bg-transparent hover:text-primary"
            onClick={() => handleNavigate("/")}
          >
            Lovable
          </Button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigate("/search")}
              className="text-sm font-medium hover:text-primary"
            >
              Browse
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigate("/about")}
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("/dashboard")}
                  className="text-sm font-medium"
                >
                  Dashboard
                </Button>
                <Button
                  variant="default"
                  onClick={() => signOut()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigate("/login")}
                  className="text-sm font-medium"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigate("/signup")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
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