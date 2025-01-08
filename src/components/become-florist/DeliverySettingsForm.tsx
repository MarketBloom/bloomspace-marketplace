import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

interface DeliverySettingsFormProps {
  formData: {
    aboutText: string;
    deliveryRadius: string;
    deliveryFee: string;
    minimumOrder: string;
    deliveryDays: string[];
    pickupOnlyDays: string[];
    cutoffTimes: {
      [key: string]: string;
    };
    sameDayEnabled: boolean;
    timeFrames: {
      morning: boolean;
      midday: boolean;
      afternoon: boolean;
    };
  };
  setFormData: (data: any) => void;
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

const timeFrames = {
  morning: "9:00 AM - 12:00 PM",
  midday: "12:00 PM - 3:00 PM",
  afternoon: "3:00 PM - 6:00 PM",
};

export const DeliverySettingsForm = ({
  formData,
  setFormData,
  loading,
}: DeliverySettingsFormProps) => {
  const handleDeliveryDayToggle = (day: string) => {
    const isDeliveryDay = formData.deliveryDays.includes(day);
    const isPickupOnly = formData.pickupOnlyDays.includes(day);

    let newDeliveryDays = [...formData.deliveryDays];
    let newPickupOnlyDays = [...formData.pickupOnlyDays];

    if (isDeliveryDay) {
      newDeliveryDays = newDeliveryDays.filter((d) => d !== day);
      newPickupOnlyDays = [...newPickupOnlyDays, day];
    } else if (isPickupOnly) {
      newPickupOnlyDays = newPickupOnlyDays.filter((d) => d !== day);
    } else {
      newDeliveryDays = [...newDeliveryDays, day];
    }

    setFormData({
      ...formData,
      deliveryDays: newDeliveryDays,
      pickupOnlyDays: newPickupOnlyDays,
    });
  };

  const handleCutoffTimeChange = (day: string, time: string) => {
    setFormData({
      ...formData,
      cutoffTimes: {
        ...formData.cutoffTimes,
        [day]: time,
      },
    });
  };

  const handleTimeFrameToggle = (frame: keyof typeof timeFrames) => {
    setFormData({
      ...formData,
      timeFrames: {
        ...formData.timeFrames,
        [frame]: !formData.timeFrames[frame],
      },
    });
  };

  return (
    <div className="space-y-6">
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

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label className="text-base">Delivery Time Options</Label>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameDayDelivery"
                  checked={formData.sameDayEnabled}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, sameDayEnabled: checked })
                  }
                />
                <label
                  htmlFor="sameDayDelivery"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enable Same Day Delivery
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Future Delivery Time Frames</Label>
              {Object.entries(timeFrames).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`timeFrame-${key}`}
                    checked={formData.timeFrames[key as keyof typeof timeFrames]}
                    onCheckedChange={() => 
                      handleTimeFrameToggle(key as keyof typeof timeFrames)
                    }
                  />
                  <label
                    htmlFor={`timeFrame-${key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Delivery Availability & Cutoff Times</Label>
        <div className="grid gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 min-w-[300px]">
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
              {formData.deliveryDays.includes(day) && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={formData.cutoffTimes[day] || "14:00"}
                    onChange={(e) => handleCutoffTimeChange(day, e.target.value)}
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">cutoff</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setFormData(formData)} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};