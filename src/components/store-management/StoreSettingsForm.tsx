import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddressAutocomplete } from "@/components/address/AddressAutocomplete";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { FloristProfile } from "@/types/florist";

interface StoreSettingsFormProps {
  initialData?: Partial<FloristProfile>;
  onSubmit?: () => void;
}

export const StoreSettingsForm = ({ initialData, onSubmit }: StoreSettingsFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    store_name: initialData?.store_name || "",
    street_address: initialData?.street_address || "",
    about_text: initialData?.about_text || "",
    delivery_fee: initialData?.delivery_fee || 0,
    delivery_radius: initialData?.delivery_radius || 5,
    minimum_order_amount: initialData?.minimum_order_amount || 0,
    coordinates: initialData?.coordinates || null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue = value;
    
    // Handle numeric fields
    if (name === 'delivery_fee' || name === 'delivery_radius' || name === 'minimum_order_amount') {
      parsedValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleAddressChange = (address: string, coordinates?: { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      street_address: address,
      coordinates: coordinates ? `POINT(${coordinates.lng} ${coordinates.lat})` : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('florist_profiles')
        .update(formData)
        .eq('id', initialData?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Store settings updated successfully",
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error updating store settings:', error);
      toast({
        title: "Error",
        description: "Failed to update store settings",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="store_name">Store Name</Label>
        <Input
          id="store_name"
          name="store_name"
          value={formData.store_name}
          onChange={handleInputChange}
          placeholder="Enter your store name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street_address">Address</Label>
        <AddressAutocomplete
          value={formData.street_address}
          onChange={handleAddressChange}
          placeholder="Search for your store address..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about_text">About</Label>
        <Textarea
          id="about_text"
          name="about_text"
          value={formData.about_text}
          onChange={handleInputChange}
          placeholder="Tell customers about your store..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="delivery_fee">Delivery Fee ($)</Label>
          <Input
            id="delivery_fee"
            name="delivery_fee"
            type="number"
            min="0"
            step="0.01"
            value={formData.delivery_fee}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_radius">Delivery Radius (km)</Label>
          <Input
            id="delivery_radius"
            name="delivery_radius"
            type="number"
            min="0"
            step="0.1"
            value={formData.delivery_radius}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimum_order_amount">Minimum Order ($)</Label>
          <Input
            id="minimum_order_amount"
            name="minimum_order_amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.minimum_order_amount}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  );
};