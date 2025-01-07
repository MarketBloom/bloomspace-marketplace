import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const logoRef = useRef<HTMLImageElement>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo/Home */}
          <Button
            variant="ghost"
            className="font-semibold text-lg hover:bg-transparent hover:text-primary p-0"
            onClick={() => handleNavigate("/")}
          >
            <img
              ref={logoRef}
              src="/lovable-uploads/da714545-96c0-4238-991e-26bb04c6c730.png"
              alt="Lovable"
              className="h-12 w-12"
            />
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