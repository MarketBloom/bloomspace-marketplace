import React from 'react';

interface FloristBannerProps {
  bannerUrl?: string;
  logoUrl?: string;
  storeName: string;
}

export const FloristBanner = ({ bannerUrl, logoUrl, storeName }: FloristBannerProps) => {
  const firstLetter = storeName?.charAt(0) || '?';

  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-40 w-full overflow-hidden bg-gray-100">
        {bannerUrl && (
          <img 
            src={bannerUrl} 
            alt={`${storeName} banner`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Logo - Centered on banner */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-8">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-lg">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${storeName} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <span className="text-4xl font-medium text-gray-400">
                {firstLetter}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};