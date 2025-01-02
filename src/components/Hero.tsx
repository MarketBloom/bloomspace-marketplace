import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center mt-16">
      <div className="absolute inset-0 flex justify-center px-4">
        <div className="relative h-full w-full max-w-[1400px] rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/a34f291e-3fa3-456b-8406-e5162ca38103.png"
            alt="Elegant floral arrangement with hands holding flowers in a soft blue dress"
            className="h-full w-full object-cover opacity-90"
            style={{ 
              objectPosition: '50% 50%',
              filter: 'grayscale(0.1) contrast(1.05) brightness(0.9)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          
          {/* Subtle grain effect */}
          <div 
            className="absolute inset-0 mix-blend-soft-light opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-light mb-2 text-white tracking-wide leading-relaxed">
              Find local florists in your area
            </h1>
            <p className="text-base md:text-lg text-white/90 font-light tracking-wider">
              Support local florists and get fresh flowers delivered
            </p>
          </div>
          
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};