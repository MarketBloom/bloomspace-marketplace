import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[65vh] flex items-center justify-center mt-4 md:mt-14">
      <div className="absolute inset-0 flex justify-center px-2 md:px-4">
        <div className="relative h-full w-full max-w-[1400px] rounded-xl overflow-hidden">
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
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-3 md:mb-5">
            <h1 className="text-xl md:text-3xl font-medium mb-2 text-foreground tracking-tight drop-shadow-md font-mono">
              Find local florists in your area
            </h1>
            <p className="text-sm md:text-base text-foreground/90 font-light drop-shadow font-mono">
              Support local florists and get fresh flowers delivered
            </p>
          </div>
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};