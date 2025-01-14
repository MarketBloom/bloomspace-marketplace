import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TimeFramesSectionProps {
  formData: {
    timeFrames: {
      morning: boolean;
      midday: boolean;
      afternoon: boolean;
    };
  };
  setFormData: (data: any) => void;
}

const defaultTimeFrames = {
  morning: "9:00 AM - 12:00 PM",
  midday: "12:00 PM - 3:00 PM",
  afternoon: "3:00 PM - 6:00 PM",
};

export const TimeFramesSection = ({ formData, setFormData }: TimeFramesSectionProps) => {
  const [customTimeFrames, setCustomTimeFrames] = useState({
    morning: defaultTimeFrames.morning,
    midday: defaultTimeFrames.midday,
    afternoon: defaultTimeFrames.afternoon,
  });

  const [slotNames, setSlotNames] = useState({
    morning: "Morning Time Slot",
    midday: "Midday Time Slot",
    afternoon: "Afternoon Time Slot",
  });

  const handleTimeFrameToggle = (frame: keyof typeof defaultTimeFrames) => {
    console.log('Toggling time frame:', frame);
    console.log('Current time frames:', formData.timeFrames);
    
    const updatedTimeFrames = {
      ...formData.timeFrames,
      [frame]: !formData.timeFrames[frame],
    };
    
    console.log('Updated time frames:', updatedTimeFrames);
    setFormData((prev: any) => ({
      ...prev,
      timeFrames: updatedTimeFrames,
    }));
  };

  const handleTimeFrameChange = (frame: keyof typeof defaultTimeFrames, value: string) => {
    setCustomTimeFrames(prev => ({
      ...prev,
      [frame]: value,
    }));
  };

  const handleSlotNameChange = (frame: keyof typeof defaultTimeFrames, value: string) => {
    setSlotNames(prev => ({
      ...prev,
      [frame]: value,
    }));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Select and customize up to 3 time slots for future deliveries
      </p>
      <div className="space-y-3">
        {Object.entries(defaultTimeFrames).map(([key, defaultValue]) => (
          <div key={key} className="border rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`timeFrame-${key}`}
                checked={formData.timeFrames[key as keyof typeof defaultTimeFrames]}
                onCheckedChange={() => 
                  handleTimeFrameToggle(key as keyof typeof defaultTimeFrames)
                }
              />
              <Label
                htmlFor={`timeFrame-${key}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Enable Time Slot
              </Label>
            </div>
            {formData.timeFrames[key as keyof typeof defaultTimeFrames] && (
              <div className="ml-6 mt-2 space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Slot Name</Label>
                  <Input
                    value={slotNames[key as keyof typeof defaultTimeFrames]}
                    onChange={(e) => handleSlotNameChange(key as keyof typeof defaultTimeFrames, e.target.value)}
                    placeholder="Enter slot name"
                    className="h-8 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Time Range</Label>
                  <Input
                    value={customTimeFrames[key as keyof typeof defaultTimeFrames]}
                    onChange={(e) => handleTimeFrameChange(key as keyof typeof defaultTimeFrames, e.target.value)}
                    placeholder={defaultValue}
                    className="h-8 mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};