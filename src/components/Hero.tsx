import { FilterBar } from "@/components/FilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[64vh] flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="absolute inset-0 flex justify-center px-4">
        <div className="relative h-full w-full max-w-[1400px] rounded-2xl overflow-hidden">
          <img 
            src="/lovable-uploads/3a13efed-e228-490b-b760-f9ff83ae9659.png"
            alt="Person carrying a beautiful flower arrangement"
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 50%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">
              Find local florists in your area
            </h1>
            <p className="text-xl text-white/90">
              Support local artisans and get fresh flowers delivered
            </p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};