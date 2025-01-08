import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

const timeFrames = {
  morning: "9:00 AM - 12:00 PM",
  midday: "12:00 PM - 3:00 PM",
  afternoon: "3:00 PM - 6:00 PM",
};

export const TimeFramesSection = ({ formData, setFormData }: TimeFramesSectionProps) => {
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
    <div className="space-y-4">
      <Label className="text-base">Future Delivery Time Frames</Label>
      <div className="space-y-2">
        <Label className="text-sm">Select available time slots for future deliveries</Label>
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
  );
};