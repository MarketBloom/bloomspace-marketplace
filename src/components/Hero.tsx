import { FilterBar } from "@/components/FilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[64vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a8663262-3249-43fd-8f45-6254895886ad.png"
          alt="Fresh sunflowers bouquet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Market Bloom
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-4">
            Same-Day or Any-Day Flowers, Delivered or Picked Up
          </p>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Support local florists and get the perfect arrangement for any occasion, 
            delivered or picked up on your schedule.
          </p>
          
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-lg">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};