import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[50vh] min-h-[600px] flex items-center justify-center bg-[#000000]">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a34f291e-3fa3-456b-8406-e5162ca38103.png"
          alt="Elegant floral arrangement with hands holding flowers in a soft blue dress"
          className="h-full w-full object-cover"
          style={{ 
            objectPosition: 'center 20%' // This crops more from the top of the image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>
      
      <div className="container relative z-10 px-4 md:px-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-semibold mb-3 text-white tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Support local florists and get fresh arrangements delivered right to your door.
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};