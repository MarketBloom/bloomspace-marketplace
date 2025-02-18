import { FloristCard } from "@/components/FloristCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloristGridProps {
  florists: any[];
}

export const FloristGrid = ({ florists }: FloristGridProps) => {
  const isMobile = useIsMobile();

  const getGridClassName = () => {
    if (isMobile) {
      return "grid grid-cols-1 gap-3";
    }
    return "grid grid-cols-2 gap-3";
  };

  return (
    <div className={getGridClassName()}>
      {florists.map((florist) => (
        <div 
          key={florist.id}
          className={`product-card-animate ${florists.length >= 7 ? 'opacity-0' : ''}`}
        >
          <FloristCard 
            id={florist.id}
            storeName={florist.store_name}
            streetAddress={florist.street_address}
            suburb={florist.suburb}
            state={florist.state}
            postcode={florist.postcode}
            aboutText={florist.about_text}
            logoUrl={florist.logo_url}
            bannerUrl={florist.banner_url}
            operatingHours={florist.operating_hours}
            deliveryFee={florist.delivery_fee}
            deliveryRadius={florist.delivery_radius}
            minimumOrderAmount={florist.minimum_order_amount}
            socialLinks={florist.social_links}
          />
        </div>
      ))}
    </div>
  );
};