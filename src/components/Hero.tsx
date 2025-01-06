import { HomeFilterBar } from "@/components/HomeFilterBar";

export const Hero = () => {
  return (
    <section className="relative h-[50vh] min-h-[600px] flex items-center justify-center bg-[#000000]">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/76f9e94c-1f57-4223-bdbc-e9525dbee6df.png"
          alt="Person carrying a beautiful floral arrangement with purple alliums and trailing amaranthus"
          className="h-full w-full object-cover"
          style={{ 
            objectPosition: 'center center' // This centers the image perfectly
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