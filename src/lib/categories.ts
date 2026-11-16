/** Plant categories in the exact order the product requires. */
export const PLANT_CATEGORIES = [
  "Indoor plants",
  "Succulents and cacti",
  "Herbs",
  "Flowers",
  "Vines and climbers",
  "Shrubs",
  "Trees",
  "Aquatic plants",
  "Vegetables",
  "Fruit",
] as const;

export type PlantCategory = (typeof PLANT_CATEGORIES)[number];
