import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FBFBFD]">
      <div className="absolute inset-0 flex justify-center">
        <div className="relative h-full w-full max-w-[1400px] overflow-hidden">
          <img 
            src="/lovable-uploads/a34f291e-3fa3-456b-8406-e5162ca38103.png"
            alt="Elegant floral arrangement with hands holding flowers in a soft blue dress"
            className="h-full w-full object-cover opacity-95"
            style={{ 
              objectPosition: 'center 30%',
              filter: 'brightness(1.02) contrast(1.02)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-8 flex flex-col">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-white tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-xl mx-auto leading-relaxed">
            Support local florists and get fresh arrangements delivered right to your door.
          </p>
        </div>
        <HomeFilterBar />
      </div>
    </section>
  );
};