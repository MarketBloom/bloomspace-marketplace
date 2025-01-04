import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/Header";

const BecomeFlorist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    address: "",
    aboutText: "",
    deliveryRadius: "5",
    deliveryFee: "0",
    minimumOrder: "0",
    operatingHours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "09:00", close: "17:00" },
      sunday: { open: "09:00", close: "17:00" },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: "florist" })
        .eq("id", user.id);

      if (profileError) throw profileError;

      const { error: floristError } = await supabase
        .from("florist_profiles")
        .insert({
          id: user.id,
          store_name: formData.storeName,
          address: formData.address,
          about_text: formData.aboutText,
          operating_hours: formData.operatingHours,
          delivery_radius: parseFloat(formData.deliveryRadius),
          delivery_fee: parseFloat(formData.deliveryFee),
          minimum_order_amount: parseFloat(formData.minimumOrder),
        });

      if (floristError) throw floristError;

      toast.success("Your florist profile has been created!");
      navigate("/florist-dashboard");
    } catch (error) {
      console.error("Error creating florist profile:", error);
      toast.error("Failed to create florist profile");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="aboutText">About Your Store</Label>
              <Textarea
                id="aboutText"
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
              <Input
                id="deliveryRadius"
                type="number"
                min="0"
                value={formData.deliveryRadius}
                onChange={(e) => setFormData({ ...formData, deliveryRadius: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
              <Input
                id="deliveryFee"
                type="number"
                min="0"
                step="0.01"
                value={formData.deliveryFee}
                onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="minimumOrder">Minimum Order Amount ($)</Label>
              <Input
                id="minimumOrder"
                type="number"
                min="0"
                step="0.01"
                value={formData.minimumOrder}
                onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Profile..." : "Create Florist Profile"}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Become a Florist</h1>
            <div className="mb-8">
              <div className="flex justify-center items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <div className="h-1 w-16 bg-gray-200"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  2
                </div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeFlorist;