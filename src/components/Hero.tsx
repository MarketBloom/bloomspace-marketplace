import { FilterBar } from "@/components/FilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/d3c25b89-58e0-45d3-95af-7baa35c7d9fc.png"
          alt="Fresh flowers from local florists"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
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