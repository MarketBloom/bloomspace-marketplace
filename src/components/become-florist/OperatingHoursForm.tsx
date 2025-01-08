import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OperatingHoursFormProps {
  formData: {
    operatingHours: {
      [key: string]: { open: string; close: string };
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
          ...formData.operatingHours[day],
          [type]: value,
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
        {daysOfWeek.map((day) => (
          <div key={day} className="grid grid-cols-2 gap-4 items-center">
            <Label className="capitalize">{day}</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="time"
                  value={formData.operatingHours[day]?.open || "09:00"}
                  onChange={(e) => handleTimeChange(day, "open", e.target.value)}
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="flex-1">
                <Input
                  type="time"
                  value={formData.operatingHours[day]?.close || "17:00"}
                  onChange={(e) => handleTimeChange(day, "close", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
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