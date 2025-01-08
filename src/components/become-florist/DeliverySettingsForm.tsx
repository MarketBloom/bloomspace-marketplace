import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface DeliverySettingsFormProps {
  formData: {
    aboutText: string;
    deliveryRadius: string;
    deliveryFee: string;
    minimumOrder: string;
    deliveryDays: string[];
    pickupOnlyDays: string[];
  };
  setFormData: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const DeliverySettingsForm = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  loading,
}: DeliverySettingsFormProps) => {
  const handleDeliveryDayToggle = (day: string) => {
    const isDeliveryDay = formData.deliveryDays.includes(day);
    const isPickupOnly = formData.pickupOnlyDays.includes(day);

    let newDeliveryDays = [...formData.deliveryDays];
    let newPickupOnlyDays = [...formData.pickupOnlyDays];

    if (isDeliveryDay) {
      // Remove from delivery days, add to pickup only
      newDeliveryDays = newDeliveryDays.filter((d) => d !== day);
      newPickupOnlyDays = [...newPickupOnlyDays, day];
    } else if (isPickupOnly) {
      // Remove from pickup only (becomes closed)
      newPickupOnlyDays = newPickupOnlyDays.filter((d) => d !== day);
    } else {
      // Add to delivery days
      newDeliveryDays = [...newDeliveryDays, day];
    }

    setFormData({
      ...formData,
      deliveryDays: newDeliveryDays,
      pickupOnlyDays: newPickupOnlyDays,
    });
  };

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
      <div className="space-y-2">
        <Label>Delivery Availability</Label>
        <div className="grid gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={`delivery-${day}`}
                checked={formData.deliveryDays.includes(day)}
                onCheckedChange={() => handleDeliveryDayToggle(day)}
              />
              <label
                htmlFor={`delivery-${day}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
              >
                {day}
                {formData.deliveryDays.includes(day) && " - Delivery Available"}
                {formData.pickupOnlyDays.includes(day) && " - Pickup Only"}
                {!formData.deliveryDays.includes(day) && !formData.pickupOnlyDays.includes(day) && " - Closed"}
              </label>
            </div>
          ))}
        </div>
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