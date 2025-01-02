import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center mt-16">
      <div className="absolute inset-0 flex justify-center px-4">
        <div className="relative h-full w-full max-w-[1400px] rounded-2xl overflow-hidden">
          <img 
            src="/lovable-uploads/a34f291e-3fa3-456b-8406-e5162ca38103.png"
            alt="Elegant floral arrangement with hands holding flowers in a soft blue dress"
            className="h-full w-full object-cover opacity-85"
            style={{ 
              objectPosition: '50% 50%',
              filter: 'contrast(1.1) brightness(0.85)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
          
          {/* Grain effect overlay */}
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white tracking-tight drop-shadow-md">
              Find local florists in your area
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light drop-shadow">
              Support local florists and get fresh flowers delivered
            </p>
          </div>
          
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};