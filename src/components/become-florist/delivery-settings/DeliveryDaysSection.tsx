import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";

interface DeliveryDaysSectionProps {
  formData: {
    deliveryDays: string[];
    pickupOnlyDays: string[];
    cutoffTimes: {
      [key: string]: string;
    };
  };
  setFormData: (data: any) => void;
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

export const DeliveryDaysSection = ({ formData, setFormData }: DeliveryDaysSectionProps) => {
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

  return (
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
  );
};