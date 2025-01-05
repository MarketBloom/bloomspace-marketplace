import React from 'react';
import { MapPin } from 'lucide-react';

interface FloristInfoProps {
  storeName: string;
  address: string;
  aboutText?: string;
}

export const FloristInfo = ({ storeName, address, aboutText }: FloristInfoProps) => {
  return (
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold tracking-tight font-mono">{storeName}</h3>
      <div className="flex items-center justify-center text-sm text-muted-foreground space-x-1">
        <MapPin className="h-4 w-4 flex-shrink-0" />
        <span className="font-mono">{address}</span>
      </div>
      {aboutText && (
        <p className="text-sm text-muted-foreground font-mono line-clamp-2 mt-2">{aboutText}</p>
      )}
    </div>
  );
};