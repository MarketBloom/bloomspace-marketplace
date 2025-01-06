import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[100dvh] md:h-[50vh] min-h-[600px] flex flex-col md:items-center md:justify-center bg-[#FFFFFF]">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png"
          alt="Beautiful pink and coral carnations arranged with dramatic shadows"
          className="h-full w-full object-cover"
          style={{ 
            objectPosition: '50% 50%' // Center crop
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
        {/* Grain effect overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="container relative z-10 px-4 md:px-8 flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center mt-16 md:mt-0">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-8">
            <h1 className="text-4xl md:text-6xl font-semibold mb-3 text-white tracking-tight">
              Fresh flowers,
              <br />
              delivered with care.
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-xl mx-auto leading-relaxed">
              Support local florists and get fresh arrangements delivered right to your door.
            </p>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto mb-8">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};