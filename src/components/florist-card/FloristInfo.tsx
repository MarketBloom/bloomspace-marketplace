import React from 'react';
import { MapPin } from 'lucide-react';

interface FloristInfoProps {
  storeName: string;
  address: string;
  aboutText?: string;
}

export const FloristInfo = ({ storeName, address, aboutText }: FloristInfoProps) => {
  return (
    <div className="text-center space-y-3">
      <h3 className="text-xl font-semibold tracking-tight">{storeName}</h3>
      <div className="flex items-center justify-center text-sm text-muted-foreground gap-1.5">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        <span>{address}</span>
      </div>
      {aboutText && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{aboutText}</p>
      )}
    </div>
  );
};