import { Clock, MapPin } from "lucide-react";

interface FloristInfoProps {
  storeName: string;
  address: string;
  aboutText?: string | null;
  operatingHours?: Record<string, { open: string; close: string }> | null;
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
    if (!operatingHours) return "Hours not specified";
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayHours = operatingHours[today];
    
    if (!dayHours) {
      // Try with short day name if long name doesn't work
      const shortToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
      const shortDayHours = operatingHours[shortToday];
      
      if (!shortDayHours) return "Closed today";
      return `Today: ${shortDayHours.open} - ${shortDayHours.close}`;
    }
    
    return `Today: ${dayHours.open} - ${dayHours.close}`;
  };

  return (
    <div className="p-4 pt-10">
      <h3 className="text-lg font-semibold mb-2">{storeName}</h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <p>{address}</p>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Clock className="h-4 w-4 mr-1" />
        <p>{formatOperatingHours()}</p>
      </div>

      {aboutText && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{aboutText}</p>
      )}

      <div className="text-sm text-gray-600 space-y-1 mb-4">
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