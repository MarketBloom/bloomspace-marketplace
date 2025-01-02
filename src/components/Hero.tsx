import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center mt-16">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img 
            src="/lovable-uploads/a34f291e-3fa3-456b-8406-e5162ca38103.png"
            alt="Elegant floral arrangement"
            className="h-full w-full object-cover"
            style={{ 
              objectPosition: '50% 50%',
              filter: 'brightness(0.75) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-light mb-6 text-white tracking-tight leading-none">
              Fresh flowers, delivered
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-extralight tracking-wide">
              Support local florists in your area
            </p>
          </div>
          
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};