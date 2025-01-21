import { FC } from 'react';
import { FloristCard } from './FloristCard';
import { Skeleton } from './ui/skeleton';

export interface FloristProfile {
  id: string;
  store_name: string;
  address: string;
  about_text?: string;
  logo_url?: string;
  banner_url?: string;
  delivery_radius: number;
  delivery_fee: number;
  minimum_order_amount: number;
}

interface FeaturedFloristsProps {
  florists: FloristProfile[];
  isLoading: boolean;
}

export const FeaturedFlorists: FC<FeaturedFloristsProps> = ({ florists, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Florists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!florists?.length) {
    return null;
  }

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Florists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {florists.map((florist) => (
          <FloristCard 
            key={florist.id} 
            florist={florist as any} // Temporary type assertion until FloristCard props are properly typed
          />
        ))}
      </div>
    </div>
  );
};