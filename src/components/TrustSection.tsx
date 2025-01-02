import { Button } from "@/components/ui/button";

export const TrustSection = ({ navigate }: { navigate: (path: string) => void }) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/c7fd657a-4ba4-4d9b-bb36-f03266f5cdc0.png"
                alt="Local florist creating an arrangement"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Support Local Artisan Florists</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every arrangement is crafted with care by passionate local florists in your area. 
                Get fresh, beautiful flowers delivered right to your door or pick up from the shop, 
                all while supporting small businesses in your community.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/search')}
              >
                Find Your Local Florist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};