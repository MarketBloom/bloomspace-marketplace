import { FilterBar } from "@/components/FilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a8663262-3249-43fd-8f45-6254895886ad.png"
          alt="Fresh flowers arrangement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
              Find local florists in your area
            </h1>
            <p className="text-xl text-white/90">
              Support local artisans and get fresh flowers delivered
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};