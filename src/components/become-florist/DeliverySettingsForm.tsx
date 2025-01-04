import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface DeliverySettingsFormProps {
  formData: {
    aboutText: string;
    deliveryRadius: string;
    deliveryFee: string;
    minimumOrder: string;
  };
  setFormData: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export const DeliverySettingsForm = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  loading,
}: DeliverySettingsFormProps) => {
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
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Creating Profile..." : "Create Florist Profile"}
        </Button>
      </div>
    </div>
  );
};