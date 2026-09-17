export const PRODUCTS = [
  {
    id: "4d_classic",
    path: "4d-classic",
    name: "Magnum 4D Classic",
    short: "4D Classic",
    description: "One 4-digit number.",
    example: "6087",
    fields: [{ key: "n1", label: "4D Number", length: 4 }],
  },
  {
    id: "4d_jackpot",
    path: "4d-jackpot",
    name: "Magnum 4D Jackpot",
    short: "4D Jackpot",
    description: "Two 4-digit numbers.",
    example: "6087 + 0781",
    fields: [
      { key: "n1", label: "First 4D", length: 4 },
      { key: "n2", label: "Second 4D", length: 4 },
    ],
  },
  {
    id: "mgold",
    path: "mgold",
    name: "mGold",
    short: "mGold",
    description: "One 6-digit number.",
    example: "878115",
    fields: [{ key: "n1", label: "6-Digit Number", length: 6 }],
  },
  {
    id: "4d_jackpot_gold",
    path: "4d-jackpot-gold",
    name: "Magnum 4D Jackpot Gold",
    short: "4D Jackpot Gold",
    description: "One 6-digit number plus a 2-digit number.",
    example: "878115 + 10",
    fields: [
      { key: "n1", label: "6-Digit Number", length: 6 },
      { key: "n2", label: "Additional Number", length: 2 },
    ],
  },
  {
    id: "magnum_life",
    path: "magnum-life",
    name: "Magnum Life",
    short: "Magnum Life",
    description: "Eight main numbers (01–36) plus two bonus numbers.",
    example: "09, 21, 22, 24, 28, 32, 35, 36 + 10, 12",
    fields: [
      { key: "n1", label: "Main 1", length: 2 },
      { key: "n2", label: "Main 2", length: 2 },
      { key: "n3", label: "Main 3", length: 2 },
      { key: "n4", label: "Main 4", length: 2 },
      { key: "n5", label: "Main 5", length: 2 },
      { key: "n6", label: "Main 6", length: 2 },
      { key: "n7", label: "Main 7", length: 2 },
      { key: "n8", label: "Main 8", length: 2 },
      { key: "b1", label: "Bonus 1", length: 2 },
      { key: "b2", label: "Bonus 2", length: 2 },
    ],
  },
];

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
export const getProductByPath = (path) =>
  PRODUCTS.find((p) => p.path === path);

