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
            florist={{
              id: florist.id,
              store_name: florist.store_name,
              address: florist.address,
              about_text: florist.about_text,
              logo_url: florist.logo_url,
              banner_url: florist.banner_url,
              operating_hours: florist.operating_hours,
              delivery_fee: florist.delivery_fee,
              delivery_radius: florist.delivery_radius,
              minimum_order_amount: florist.minimum_order_amount,
              social_links: florist.social_links
            }}
          />
        </div>
      ))}
    </div>
  );
};