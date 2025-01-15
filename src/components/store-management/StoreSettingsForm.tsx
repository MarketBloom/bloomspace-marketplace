import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const StoreSettingsForm = ({ user }) => {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryRadius, setDeliveryRadius] = useState(0);
  const [minimumOrderAmount, setMinimumOrderAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Geocode the address
      const geocoder = new google.maps.Geocoder();
      const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      const { lat, lng } = result.geometry.location;
      const coordinates = `POINT(${lng()} ${lat()})`;
      const geocodedAddress = {
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        location: {
          lat: lat(),
          lng: lng()
        }
      };

      const { error } = await supabase
        .from('florist_profiles')
        .update({
          store_name: storeName,
          address,
          about_text: aboutText,
          delivery_fee: deliveryFee,
          delivery_radius: deliveryRadius,
          minimum_order_amount: minimumOrderAmount,
          coordinates,
          geocoded_address: geocodedAddress
        })
        .eq('id', user?.id);

      if (error) throw error;
      toast.success('Store settings updated successfully');
    } catch (error) {
      console.error('Error updating store settings:', error);
      toast.error('Failed to update store settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="Store Name"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
      <textarea
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        placeholder="About"
      />
      <input
        type="number"
        value={deliveryFee}
        onChange={(e) => setDeliveryFee(Number(e.target.value))}
        placeholder="Delivery Fee"
        required
      />
      <input
        type="number"
        value={deliveryRadius}
        onChange={(e) => setDeliveryRadius(Number(e.target.value))}
        placeholder="Delivery Radius (km)"
        required
      />
      <input
        type="number"
        value={minimumOrderAmount}
        onChange={(e) => setMinimumOrderAmount(Number(e.target.value))}
        placeholder="Minimum Order Amount"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Store Settings'}
      </button>
    </form>
  );
};

export default StoreSettingsForm;