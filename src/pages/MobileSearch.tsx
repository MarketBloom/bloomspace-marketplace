import { SearchHeader } from "@/components/search/SearchHeader";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";
import { MobileSearchResults } from "@/components/search/mobile/MobileSearchResults";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";

const MobileSearch = () => {
  const screenSize = useScreenSize();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 z-10">
        <PixelTrail
          pixelSize={48}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-primary/10"
        />
      </div>
      <div className="relative z-20">
        <SearchHeader />
        <div className="container mx-auto px-4 py-4">
          <MobileFilterButton />
          <MobileSearchResults />
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;