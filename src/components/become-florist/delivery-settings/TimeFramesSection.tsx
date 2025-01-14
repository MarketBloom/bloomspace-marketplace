import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  morning: {
    label: "Morning",
    defaultTime: "09:00-12:00",
  },
  midday: {
    label: "Midday",
    defaultTime: "12:00-15:00",
  },
  afternoon: {
    label: "Afternoon",
    defaultTime: "15:00-18:00",
  },
};

export const TimeFramesSection = ({ formData, setFormData }: TimeFramesSectionProps) => {
  const handleTimeFrameToggle = (frame: keyof typeof defaultTimeFrames) => {
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

  return (
    <div className="space-y-4">
      {(Object.keys(defaultTimeFrames) as Array<keyof typeof defaultTimeFrames>).map((frame) => (
        <div key={frame} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.timeFrames[frame]}
              onCheckedChange={() => handleTimeFrameToggle(frame)}
            />
            <Label>{defaultTimeFrames[frame].label}</Label>
          </div>
          <span className="text-sm text-muted-foreground">
            {defaultTimeFrames[frame].defaultTime}
          </span>
        </div>
      ))}
    </div>
  );
};