import { FilterBar } from "@/components/FilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[64vh] flex items-center">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a8663262-3249-43fd-8f45-6254895886ad.png"
          alt="Fresh sunflowers bouquet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Find local florists in your area
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            Support local artisans and get fresh flowers delivered or picked up on your schedule
          </p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};