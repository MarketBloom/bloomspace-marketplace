import { FilterBar } from "@/components/FilterBar";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearch from "./MobileSearch";
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";

const Search = () => {
  const isMobile = useIsMobile();
  const screenSize = useScreenSize();

  if (isMobile) {
    return <MobileSearch />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 z-10">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 80}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-primary/10"
        />
      </div>
      <div className="relative z-20">
        <SearchHeader />
        <div className="container mx-auto px-4 py-8">
          <FilterBar />
          <SearchResults />
        </div>
      </div>
    </div>
  );
};

export default Search;