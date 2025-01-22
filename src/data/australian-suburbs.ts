export interface Suburb {
  suburb: string;
  state: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

// Major metropolitan suburbs dataset
export const AUSTRALIAN_SUBURBS: Suburb[] = [
  // Sydney Metro
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
  {
    suburb: "Chatswood",
    state: "NSW",
    postcode: "2067",
    latitude: -33.7969,
    longitude: 151.1808
  },
  {
    suburb: "Manly",
    state: "NSW",
    postcode: "2095",
    latitude: -33.7969,
    longitude: 151.2878
  },
  {
    suburb: "Double Bay",
    state: "NSW",
    postcode: "2028",
    latitude: -33.8775,
    longitude: 151.2402
  },
  {
    suburb: "Newtown",
    state: "NSW",
    postcode: "2042",
    latitude: -33.8960,
    longitude: 151.1786
  },
  // Melbourne Metro
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
  {
    suburb: "Carlton",
    state: "VIC",
    postcode: "3053",
    latitude: -37.7946,
    longitude: 144.9677
  },
  {
    suburb: "Brighton",
    state: "VIC",
    postcode: "3186",
    latitude: -37.9075,
    longitude: 144.9927
  },
  {
    suburb: "Toorak",
    state: "VIC",
    postcode: "3142",
    latitude: -37.8404,
    longitude: 145.0199
  },
  // Brisbane Metro
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
  {
    suburb: "New Farm",
    state: "QLD",
    postcode: "4005",
    latitude: -27.4676,
    longitude: 153.0528
  },
  {
    suburb: "Paddington",
    state: "QLD",
    postcode: "4064",
    latitude: -27.4610,
    longitude: 152.9989
  },
  {
    suburb: "Broadbeach",
    state: "QLD",
    postcode: "4218",
    latitude: -28.0297,
    longitude: 153.4343
  },
  // Perth Metro
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
  {
    suburb: "Subiaco",
    state: "WA",
    postcode: "6008",
    latitude: -31.9494,
    longitude: 115.8273
  },
  {
    suburb: "Cottesloe",
    state: "WA",
    postcode: "6011",
    latitude: -31.9925,
    longitude: 115.7547
  },
  {
    suburb: "South Perth",
    state: "WA",
    postcode: "6151",
    latitude: -31.9841,
    longitude: 115.8593
  },
  // Adelaide Metro
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
  {
    suburb: "North Adelaide",
    state: "SA",
    postcode: "5006",
    latitude: -34.9099,
    longitude: 138.5917
  },
  {
    suburb: "Unley",
    state: "SA",
    postcode: "5061",
    latitude: -34.9500,
    longitude: 138.6000
  },
  {
    suburb: "Norwood",
    state: "SA",
    postcode: "5067",
    latitude: -34.9214,
    longitude: 138.6300
  },
  // Hobart Metro
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
  {
    suburb: "Battery Point",
    state: "TAS",
    postcode: "7004",
    latitude: -42.8871,
    longitude: 147.3318
  },
  {
    suburb: "North Hobart",
    state: "TAS",
    postcode: "7000",
    latitude: -42.8775,
    longitude: 147.3186
  },
  // Darwin Metro
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
  },
  {
    suburb: "Fannie Bay",
    state: "NT",
    postcode: "0820",
    latitude: -12.4228,
    longitude: 130.8371
  },
  {
    suburb: "Nightcliff",
    state: "NT",
    postcode: "0810",
    latitude: -12.3787,
    longitude: 130.8451
  }
];