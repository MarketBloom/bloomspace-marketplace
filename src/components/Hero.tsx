import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHero } from "@/components/MobileHero";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const Hero = () => {
  return (
    <>
      <MobileHero />
      <section className="relative h-[calc(50vh-80px)] min-h-[520px] hidden md:flex items-center justify-center bg-[#FFFFFF] z-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png"
            alt="Beautiful pink and coral carnations arranged with dramatic shadows"
            className="h-full w-full object-cover"
            style={{ 
              objectPosition: '50% 30%',
              objectFit: 'cover',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="container relative z-10 px-8 flex flex-col items-center md:pt-20">
          <div className="max-w-3xl mx-auto text-center mb-8 mt-5">
            <GooeyText
              texts={[
                "Your City's Best Florists",
                "All in One Place"
              ]}
              className="h-[72px]"
              textClassName="text-7xl font-semibold tracking-tight text-white whitespace-nowrap"
              morphTime={1}
              cooldownTime={3}
            />
          </div>
          <div className="w-full max-w-4xl mt-0">
            <HomeFilterBar />
          </div>
        </div>
      </section>
    </>
  );
};