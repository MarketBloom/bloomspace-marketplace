export interface Suburb {
  suburb: string;
  state: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

// This is a sample dataset - you'll want to replace this with complete data
export const AUSTRALIAN_SUBURBS: Suburb[] = [
  // New South Wales
  {
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    suburb: "Bondi",
    state: "NSW",
    postcode: "2026",
    latitude: -33.8927,
    longitude: 151.2745
  },
  {
    suburb: "Surry Hills",
    state: "NSW",
    postcode: "2010",
    latitude: -33.8858,
    longitude: 151.2111
  },
  {
    suburb: "Parramatta",
    state: "NSW",
    postcode: "2150",
    latitude: -33.8150,
    longitude: 151.0011
  },
  // Victoria
  {
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000",
    latitude: -37.8136,
    longitude: 144.9631
  },
  {
    suburb: "South Yarra",
    state: "VIC",
    postcode: "3141",
    latitude: -37.8397,
    longitude: 144.9843
  },
  {
    suburb: "St Kilda",
    state: "VIC",
    postcode: "3182",
    latitude: -37.8677,
    longitude: 144.9809
  },
  {
    suburb: "Richmond",
    state: "VIC",
    postcode: "3121",
    latitude: -37.8232,
    longitude: 144.9987
  },
  // Queensland
  {
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4000",
    latitude: -27.4698,
    longitude: 153.0251
  },
  {
    suburb: "Surfers Paradise",
    state: "QLD",
    postcode: "4217",
    latitude: -28.0016,
    longitude: 153.4307
  },
  {
    suburb: "South Brisbane",
    state: "QLD",
    postcode: "4101",
    latitude: -27.4809,
    longitude: 153.0172
  },
  {
    suburb: "Fortitude Valley",
    state: "QLD",
    postcode: "4006",
    latitude: -27.4570,
    longitude: 153.0344
  },
  // South Australia
  {
    suburb: "Adelaide",
    state: "SA",
    postcode: "5000",
    latitude: -34.9285,
    longitude: 138.6007
  },
  {
    suburb: "Glenelg",
    state: "SA",
    postcode: "5045",
    latitude: -34.9820,
    longitude: 138.5160
  },
  // Western Australia
  {
    suburb: "Perth",
    state: "WA",
    postcode: "6000",
    latitude: -31.9505,
    longitude: 115.8605
  },
  {
    suburb: "Fremantle",
    state: "WA",
    postcode: "6160",
    latitude: -32.0569,
    longitude: 115.7439
  },
  // Tasmania
  {
    suburb: "Hobart",
    state: "TAS",
    postcode: "7000",
    latitude: -42.8821,
    longitude: 147.3272
  },
  {
    suburb: "Sandy Bay",
    state: "TAS",
    postcode: "7005",
    latitude: -42.9037,
    longitude: 147.3293
  },
  // Northern Territory
  {
    suburb: "Darwin",
    state: "NT",
    postcode: "0800",
    latitude: -12.4634,
    longitude: 130.8456
  },
  {
    suburb: "Palmerston",
    state: "NT",
    postcode: "0830",
    latitude: -12.4800,
    longitude: 130.9833
  }
];