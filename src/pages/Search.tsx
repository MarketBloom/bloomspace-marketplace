import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearch from "./MobileSearch";
import { SearchLayout } from "@/components/search/SearchLayout";
import { useSearchParams } from "react-router-dom";
import { useGoogleMaps } from "@/components/search/hooks/useGoogleMaps";
import { useState } from "react";

const Search = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);

  useGoogleMaps({ 
    searchParams, 
    onCoordsChange: setUserCoordinates 
  });

  if (isMobile) {
    return <MobileSearch />;
  }

  return <SearchLayout userCoordinates={userCoordinates} />;
};

export default Search;