import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OperatingHoursSectionProps {
  formData: {
    operatingHours: {
      [key: string]: { open: string; close: string };
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

export const OperatingHoursSection = ({ formData, setFormData }: OperatingHoursSectionProps) => {
  const handleTimeChange = (day: string, type: 'open' | 'close', time: string) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...formData.operatingHours[day],
          [type]: time,
        },
      },
    });
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-2">
        Set your store's operating hours for pickup orders
      </div>
      <div className="grid gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="grid grid-cols-[120px_1fr] gap-4 items-center">
            <Label className="capitalize text-sm">{day}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={formData.operatingHours[day]?.open || "09:00"}
                onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                className="w-32 h-8"
              />
              <span className="text-sm">to</span>
              <Input
                type="time"
                value={formData.operatingHours[day]?.close || "17:00"}
                onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                className="w-32 h-8"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};