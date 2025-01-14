import { Clock, MapPin } from "lucide-react";

interface FloristInfoProps {
  storeName: string;
  address: string;
  aboutText?: string | null;
  operatingHours?: Record<string, { open?: string; close?: string; isClosed?: boolean }> | null;
  deliveryFee?: number | null;
  deliveryRadius?: number | null;
  minimumOrderAmount?: number | null;
}

export const FloristInfo = ({
  storeName,
  address,
  aboutText,
  operatingHours,
  deliveryFee,
  deliveryRadius,
  minimumOrderAmount,
}: FloristInfoProps) => {
  const formatOperatingHours = () => {
    if (!operatingHours || Object.keys(operatingHours).length === 0) {
      return null;
    }

    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    return daysOrder.map(day => {
      const hours = operatingHours[day];
      const isToday = day === today;

      let timeDisplay = 'Closed';
      if (hours && !hours.isClosed && hours.open && hours.close) {
        timeDisplay = `${hours.open} - ${hours.close}`;
      }

      return {
        day: day.charAt(0).toUpperCase() + day.slice(1),
        hours: timeDisplay,
        isToday
      };
    });
  };

  const hoursData = formatOperatingHours();

  return (
    <div className="p-4 pt-10">
      <h3 className="text-lg font-semibold mb-2">{storeName}</h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <p>{address}</p>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <div className="flex items-center mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <p className="font-medium">Operating Hours</p>
        </div>
        {hoursData ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 ml-5">
            {hoursData.map(({ day, hours, isToday }) => (
              <div key={day} className="col-span-2 grid grid-cols-2">
                <span className={`${isToday ? 'font-medium' : ''}`}>
                  {day}{isToday ? ' (Today)' : ''}:
                </span>
                <span className={`${isToday ? 'font-medium' : ''}`}>{hours}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="ml-5">Hours not specified</p>
        )}
      </div>

      {aboutText && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{aboutText}</p>
      )}

      <div className="text-sm text-gray-600 space-y-1">
        {deliveryFee !== null && (
          <p>Delivery Fee: ${deliveryFee?.toFixed(2)}</p>
        )}
        {deliveryRadius !== null && (
          <p>Delivery Radius: {deliveryRadius} km</p>
        )}
        {minimumOrderAmount !== null && (
          <p>Minimum Order: ${minimumOrderAmount?.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};