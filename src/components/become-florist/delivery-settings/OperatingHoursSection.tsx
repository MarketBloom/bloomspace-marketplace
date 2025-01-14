import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface OperatingHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

interface OperatingHoursSectionProps {
  formData: {
    operatingHours: {
      [key: string]: OperatingHours;
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
          ...(formData.operatingHours[day] || {}),
          [type]: time,
        },
      },
    });
  };

  const toggleDayStatus = (day: string) => {
    const currentDay = formData.operatingHours[day] || { open: "09:00", close: "17:00" };
    const isClosed = !currentDay.isClosed;
    
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          open: isClosed ? "" : (currentDay.open || "09:00"),
          close: isClosed ? "" : (currentDay.close || "17:00"),
          isClosed,
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
        {daysOfWeek.map((day) => {
          const dayData = formData.operatingHours[day] || { open: "09:00", close: "17:00", isClosed: false };
          const isClosed = dayData.isClosed;

          return (
            <div key={day} className="grid grid-cols-[120px_1fr] gap-4 items-center">
              <div className="flex items-center gap-2">
                <Label className="capitalize text-sm">{day}</Label>
                <Switch
                  checked={!isClosed}
                  onCheckedChange={() => toggleDayStatus(day)}
                />
              </div>
              <div className="flex items-center gap-2">
                {!isClosed && (
                  <>
                    <Input
                      type="time"
                      value={dayData.open || "09:00"}
                      onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                      className="w-32 h-8"
                    />
                    <span className="text-sm">to</span>
                    <Input
                      type="time"
                      value={dayData.close || "17:00"}
                      onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                      className="w-32 h-8"
                    />
                  </>
                )}
                {isClosed && (
                  <span className="text-muted-foreground italic">Closed</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};