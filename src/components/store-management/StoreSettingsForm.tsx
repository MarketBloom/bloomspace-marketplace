import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface StoreSettingsFormProps {
  initialData: any;
  onUpdate: () => void;
}

export const StoreSettingsForm = ({ initialData, onUpdate }: StoreSettingsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    store_name: initialData?.store_name || "",
    address: initialData?.address || "",
    about_text: initialData?.about_text || "",
    delivery_fee: initialData?.delivery_fee || 0,
    delivery_radius: initialData?.delivery_radius || 5,
    minimum_order_amount: initialData?.minimum_order_amount || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase
          .from("florist_profiles")
          .update(formData)
          .eq("id", initialData.id);

        if (error) throw error;
        onUpdate();
        resolve(true);
      } catch (error) {
        console.error("Error updating store settings:", error);
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });

    toast.promise(promise, {
      loading: 'Saving store settings...',
      success: 'Store settings updated successfully',
      error: 'Failed to update store settings',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="store_name">Store Name</Label>
        <Input
          id="store_name"
          value={formData.store_name}
          onChange={(e) => setFormData(prev => ({ ...prev, store_name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about_text">About Your Store</Label>
        <Textarea
          id="about_text"
          value={formData.about_text}
          onChange={(e) => setFormData(prev => ({ ...prev, about_text: e.target.value }))}
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="delivery_fee">Delivery Fee</Label>
          <div className="relative">
            <Input
              id="delivery_fee"
              type="number"
              min="0"
              step="0.01"
              value={formData.delivery_fee}
              onChange={(e) => setFormData(prev => ({ ...prev, delivery_fee: parseFloat(e.target.value) }))}
              className="pl-6"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_radius">Delivery Radius</Label>
          <div className="relative">
            <Input
              id="delivery_radius"
              type="number"
              min="0"
              step="0.1"
              value={formData.delivery_radius}
              onChange={(e) => setFormData(prev => ({ ...prev, delivery_radius: parseFloat(e.target.value) }))}
              className="pr-8"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">km</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimum_order_amount">Minimum Order</Label>
          <div className="relative">
            <Input
              id="minimum_order_amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.minimum_order_amount}
              onChange={(e) => setFormData(prev => ({ ...prev, minimum_order_amount: parseFloat(e.target.value) }))}
              className="pl-6"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  );
};