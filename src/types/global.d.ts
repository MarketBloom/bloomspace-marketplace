interface Window {
  google: {
    maps: {
      Geocoder: new () => {
        geocode: (
          request: { address: string },
          callback: (
            results: { geometry: { location: { lat: () => number; lng: () => number } } }[] | null,
            status: string
          ) => void
        ) => void;
      };
    };
  };
  initGoogleMaps: () => void;
  calculate_distance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}