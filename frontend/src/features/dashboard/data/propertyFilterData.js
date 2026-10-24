
export const PRIMARY = "#6C5CE7";
export const DARK = "#0F0B3D";

// Locations available in the filter.
export const ALL_CITIES = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
  "Butwal",
  "Biratnagar",
  "Dharan",
  "Hetauda",
  "Banepa",
  "Dhulikhel",
  "Itahari",
];

// Property categories and their subcategories.
export const TYPES = [
  {
    name: "House",
    sub: [
      "Residential House",
      "Independent House",
      "Villa",
      "Bungalow",
      "Duplex",
      "Cottage",
      "Townhouse",
      "Farmhouse",
    ],
  },
  {
    name: "Apartment",
    sub: [
      "Studio Apartment",
      "1 BHK",
      "2 BHK",
      "3 BHK",
      "4+ BHK",
      "Penthouse",
      "Serviced Apartment",
      "Duplex Apartment",
    ],
  },
  {
    name: "Project",
    sub: [
      "Residential Project",
      "Apartment Project",
      "Housing Colony",
      "Gated Community",
      "Commercial Project",
      "Mixed-Use Project",
      "Under-Construction Project",
      "Ready-to-Move Project",
    ],
  },
  {
    name: "Land",
    sub: [
      "Residential Land",
      "Commercial Land",
      "Agricultural Land",
      "Industrial Land",
      "Development Land",
      "Farm Land",
      "Land with Building",
    ],
  },
];

// Price configuration for rent and purchase filters.
// Values are in Nepalese rupees (NPR).
export const RANGES = {
  Rent: {
    min: 0,
    max: 100000,
    step: 1000,
    default: [10000, 50000],
    presets: [
      { label: "Under Rs. 20k", value: [0, 20000] },
      { label: "Rs. 20k – Rs. 50k", value: [20000, 50000] },
      { label: "Rs. 50k – Rs. 80k", value: [50000, 80000] },
      { label: "Any price", value: [0, 100000] },
    ],
  },

  Buy: {
    min: 0,
    max: 50000000,
    step: 500000,
    default: [5000000, 25000000],
    presets: [
      { label: "Under Rs. 1 Cr", value: [0, 10000000] },
      { label: "Rs. 1 Cr – Rs. 2.5 Cr", value: [10000000, 25000000] },
      { label: "Rs. 2.5 Cr – Rs. 4 Cr", value: [25000000, 40000000] },
      { label: "Any price", value: [0, 50000000] },
    ],
  },
};

// SVG path data keeps this file valid JavaScript without JSX.
// The icons can be rendered by TypePanel.jsx.
export const typeSvg = {
  House: [
    "M3 10.5 12 3l9 7.5",
    "M5 9v12h14V9",
    "M9 21v-7h6v7",
  ],
  Apartment: [
    "M5 21V4h14v17",
    "M9 8h2",
    "M13 8h2",
    "M9 12h2",
    "M13 12h2",
    "M9 16h2",
    "M13 16h2",
    "M3 21h18",
  ],
  Project: [
    "M3 21h18",
    "M5 21V8l7-5 7 5v13",
    "M9 12h6",
    "M9 16h6",
  ],
  Land: [
    "m3 17 5-10 5 6 4-8 4 12H3Z",
    "M3 21h18",
  ],
};
