import React from 'react';

interface FloristBannerProps {
  bannerUrl?: string;
  logoUrl?: string;
  storeName: string;
}

export const FloristBanner = ({ bannerUrl, logoUrl, storeName }: FloristBannerProps) => {
  // Ensure storeName is not undefined and has at least one character
  const firstLetter = storeName?.charAt(0) || '?';

  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-40 w-full overflow-hidden">
        {bannerUrl ? (
          <img 
            src={bannerUrl} 
            alt={`${storeName} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10" />
        )}
      </div>

      {/* Logo - Centered on banner */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8">
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-2xl">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${storeName} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">
                {firstLetter}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};