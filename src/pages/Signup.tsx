import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"customer" | "florist">("customer");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName, role);
      
      if (error) throw error;

      toast.success("Account created! Please check your email to confirm your account.");
      
      if (role === "florist") {
        navigate("/become-florist");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                  minLength={6}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>
              <div className="space-y-2">
                <Label>
                  I want to <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value: "customer" | "florist") => setRole(value)}
                  className="mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Buy Flowers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="florist" id="florist" />
                    <Label htmlFor="florist">Sell Flowers</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </Card>
          {role === "florist" && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h2 className="text-sm font-semibold text-blue-800 mb-2">
                Becoming a Florist
              </h2>
              <p className="text-sm text-blue-700">
                After creating your account, you'll be directed to set up your store where you can:
              </p>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                <li>Set up your store profile</li>
                <li>Upload store images</li>
                <li>Configure delivery settings</li>
                <li>Add your products</li>
              </ul>
              <p className="mt-2 text-sm text-blue-700">
                You can save your progress at any time and publish your store when you're ready.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;