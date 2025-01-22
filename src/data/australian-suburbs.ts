export interface Suburb {
  suburb: string;
  state: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

// This is a sample dataset - you'll want to replace this with complete data
export const AUSTRALIAN_SUBURBS: Suburb[] = [
  {
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000",
    latitude: -37.8136,
    longitude: 144.9631
  },
  {
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4000",
    latitude: -27.4698,
    longitude: 153.0251
  },
  // Add more suburbs as needed
];