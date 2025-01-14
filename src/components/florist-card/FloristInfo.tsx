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
    if (!operatingHours || typeof operatingHours !== 'object') {
      console.log("Operating hours data:", operatingHours);
      return "Hours not specified";
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const shortToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    
    console.log("Checking hours for:", today, shortToday);
    console.log("Available operating hours:", operatingHours);

    // Check all possible formats
    const possibleFormats = [
      today,                    // lowercase long (monday)
      shortToday,              // lowercase short (mon)
      today.toUpperCase(),     // uppercase long (MONDAY)
      shortToday.toUpperCase(),// uppercase short (MON)
      today.charAt(0).toUpperCase() + today.slice(1), // Capitalized long (Monday)
      shortToday.charAt(0).toUpperCase() + shortToday.slice(1), // Capitalized short (Mon)
    ];

    for (const format of possibleFormats) {
      const hours = operatingHours[format];
      if (hours?.open && hours?.close) {
        return `Today: ${hours.open} - ${hours.close}`;
      }
    }

    return "Closed today";
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