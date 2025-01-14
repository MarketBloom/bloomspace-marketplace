import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const DEFAULT_OPEN = "09:00";
const DEFAULT_CLOSE = "17:00";

// Generate time options in 30-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ['00', '30']) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;
      times.push(timeString);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const formatTimeForDisplay = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const OperatingHoursForm = ({
  formData,
  setFormData,
  onNext,
  onBack,
}: OperatingHoursFormProps) => {
  const handleTimeChange = (day: string, type: 'open' | 'close', time: string) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...(formData.operatingHours[day] || { open: DEFAULT_OPEN, close: DEFAULT_CLOSE }),
          [type]: time,
          isClosed: false,
        },
      },
    });
  };

  const toggleDayStatus = (day: string) => {
    const currentDay = formData.operatingHours[day] || { open: DEFAULT_OPEN, close: DEFAULT_CLOSE };
    const isClosed = !currentDay.isClosed;
    
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          open: currentDay.open || DEFAULT_OPEN,
          close: currentDay.close || DEFAULT_CLOSE,
          isClosed,
        },
      },
    });
  };

  // Initialize days with default values if not set
  const initializeDefaultHours = () => {
    const updatedHours = { ...formData.operatingHours };
    daysOfWeek.forEach(day => {
      if (!updatedHours[day]) {
        updatedHours[day] = {
          open: DEFAULT_OPEN,
          close: DEFAULT_CLOSE,
          isClosed: false
        };
      }
    });
    return updatedHours;
  };

  // Ensure all days have default values
  useState(() => {
    const initializedHours = initializeDefaultHours();
    if (Object.keys(initializedHours).length !== Object.keys(formData.operatingHours).length) {
      setFormData({
        ...formData,
        operatingHours: initializedHours,
      });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Operating Hours</h2>
      </div>

      <div className="grid gap-4">
        {daysOfWeek.map((day) => {
          const dayData = formData.operatingHours[day] || { 
            open: DEFAULT_OPEN, 
            close: DEFAULT_CLOSE, 
            isClosed: false 
          };
          const isClosed = dayData.isClosed;

          return (
            <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-32">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={!isClosed}
                    onCheckedChange={() => toggleDayStatus(day)}
                  />
                  <Label className="capitalize font-medium">{day}</Label>
                </div>
              </div>
              
              {!isClosed ? (
                <div className="flex-1 flex items-center gap-3">
                  <Select
                    value={dayData.open}
                    onValueChange={(value) => handleTimeChange(day, 'open', value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>{formatTimeForDisplay(dayData.open)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {formatTimeForDisplay(time)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-muted-foreground">to</span>

                  <Select
                    value={dayData.close}
                    onValueChange={(value) => handleTimeChange(day, 'close', value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>{formatTimeForDisplay(dayData.close)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {formatTimeForDisplay(time)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <span className="text-muted-foreground italic">Closed</span>
              )}
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