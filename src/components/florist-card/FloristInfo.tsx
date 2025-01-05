import React from 'react';
import { MapPin } from 'lucide-react';

interface FloristInfoProps {
  storeName: string;
  address: string;
  aboutText?: string;
}

export const FloristInfo = ({ storeName, address, aboutText }: FloristInfoProps) => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-medium">{storeName}</h3>
      <div className="flex items-center justify-center text-sm text-gray-500 gap-1">
        <MapPin className="h-4 w-4" />
        <span>{address}</span>
      </div>
      {aboutText && (
        <p className="text-sm text-gray-500 line-clamp-2">{aboutText}</p>
      )}
    </div>
  );
};