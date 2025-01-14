import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface OperatingHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

interface OperatingHoursFormProps {
  formData: {
    operatingHours: {
      [key: string]: OperatingHours;
    };
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
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

export const OperatingHoursForm = ({
  formData,
  setFormData,
  onNext,
  onBack,
}: OperatingHoursFormProps) => {
  const handleTimeChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...(formData.operatingHours[day] || {}),
          [type]: value,
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
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Operating Hours</h2>
      </div>

      <div className="grid gap-4">
        {daysOfWeek.map((day) => {
          const dayData = formData.operatingHours[day] || { open: "09:00", close: "17:00", isClosed: false };
          const isClosed = dayData.isClosed;

          return (
            <div key={day} className="grid grid-cols-[120px_1fr] gap-4 items-center">
              <div className="flex items-center gap-2">
                <Label className="capitalize">{day}</Label>
                <Switch
                  checked={!isClosed}
                  onCheckedChange={() => toggleDayStatus(day)}
                />
              </div>
              <div className="flex gap-2 items-center">
                {!isClosed && (
                  <>
                    <div className="flex-1">
                      <Input
                        type="time"
                        value={dayData.open || "09:00"}
                        onChange={(e) => handleTimeChange(day, "open", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex-1">
                      <Input
                        type="time"
                        value={dayData.close || "17:00"}
                        onChange={(e) => handleTimeChange(day, "close", e.target.value)}
                        className="w-full"
                      />
                    </div>
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

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};