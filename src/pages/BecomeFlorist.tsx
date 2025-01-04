import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { StoreDetailsForm } from "@/components/become-florist/StoreDetailsForm";
import { DeliverySettingsForm } from "@/components/become-florist/DeliverySettingsForm";
import { ImageUploadForm } from "@/components/become-florist/ImageUploadForm";
import { StepIndicator } from "@/components/become-florist/StepIndicator";
import { Button } from "@/components/ui/button";

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
    logoUrl: "",
    bannerUrl: "",
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

  const handleSubmit = async () => {
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
          logo_url: formData.logoUrl,
          banner_url: formData.bannerUrl,
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

  const handleSkip = async () => {
    if (!user) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Create a basic florist profile with minimal information
      const { error: floristError } = await supabase
        .from("florist_profiles")
        .insert({
          id: user.id,
          store_name: "My Store",
          address: "",
          store_status: "private",
          setup_progress: 0
        });

      if (floristError) throw floristError;

      toast.success("Welcome! You can set up your store later.");
      navigate("/florist-dashboard");
    } catch (error) {
      console.error("Error creating basic florist profile:", error);
      toast.error("Failed to create florist profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (type: "logo" | "banner", url: string) => {
    setFormData((prev) => ({
      ...prev,
      [type === "logo" ? "logoUrl" : "bannerUrl"]: url,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StoreDetailsForm
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <ImageUploadForm
            onImageUpload={handleImageUpload}
          />
        );
      case 3:
        return (
          <DeliverySettingsForm
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
          />
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
            <h1 className="text-2xl font-bold text-center mb-6">
              Set Up Your Store
            </h1>
            <div className="flex justify-between items-center mb-6">
              <StepIndicator currentStep={step} totalSteps={3} />
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={loading}
                className="text-muted-foreground hover:text-primary"
              >
                Skip for now
              </Button>
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