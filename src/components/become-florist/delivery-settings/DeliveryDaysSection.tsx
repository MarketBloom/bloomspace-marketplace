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

  const handleSameDayToggle = (day: string) => {
    const isSameDay = formData.cutoffTimes[day] !== undefined;
    const newCutoffTimes = { ...formData.cutoffTimes };

    if (isSameDay) {
      delete newCutoffTimes[day];
    } else {
      newCutoffTimes[day] = "14:00";
    }

    setFormData({
      ...formData,
      cutoffTimes: newCutoffTimes,
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
      <div className="grid gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center border rounded-lg p-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
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
                </label>
              </div>
              <span className="text-sm text-muted-foreground">
                {formData.deliveryDays.includes(day) && "Delivery Available"}
                {formData.pickupOnlyDays.includes(day) && "Pickup Only"}
                {!formData.deliveryDays.includes(day) && !formData.pickupOnlyDays.includes(day) && "Closed"}
              </span>
            </div>

            {formData.deliveryDays.includes(day) && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`sameday-${day}`}
                    checked={formData.cutoffTimes[day] !== undefined}
                    onCheckedChange={() => handleSameDayToggle(day)}
                  />
                  <label
                    htmlFor={`sameday-${day}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same Day
                  </label>
                </div>

                {formData.cutoffTimes[day] !== undefined && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={formData.cutoffTimes[day] || "14:00"}
                      onChange={(e) => handleCutoffTimeChange(day, e.target.value)}
                      className="w-32 h-8"
                    />
                    <span className="text-sm text-muted-foreground">cutoff</span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};