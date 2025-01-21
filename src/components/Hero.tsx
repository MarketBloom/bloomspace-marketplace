import { HomeFilterBar } from "@/components/HomeFilterBar";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

interface HeroProps {
  location: string;
  setLocation: (location: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const Hero = ({ location, setLocation, onSearch, isLoading }: HeroProps) => {
  return (
    <section className="relative h-[calc(100vh-60px)] flex items-center justify-center bg-[#FFFFFF]">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png"
          alt="Beautiful pink and coral carnations arranged with dramatic shadows"
          className="h-full w-full object-cover"
          style={{ 
            objectPosition: '50% 18%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
      </div>
      
      <div className="container relative z-10 px-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <GooeyText
            texts={[
              ["Your Cities", "Best Florists"],
              "All in One Place"
            ]}
            className="h-[72px]"
            textClassName="text-4xl font-semibold tracking-tight text-white whitespace-nowrap"
            morphTime={1}
            cooldownTime={3}
          />
        </div>
        <div className="w-full max-w-4xl">
          <HomeFilterBar 
            location={location}
            setLocation={setLocation}
            onSearch={onSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};