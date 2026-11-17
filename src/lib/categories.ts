import aquaticImg from "@/assets/categories/aquatic-plants.jpg";
import flowersImg from "@/assets/categories/flowers.jpg";
import fruitImg from "@/assets/categories/fruit.jpg";
import herbsImg from "@/assets/categories/herbs.jpg";
import indoorImg from "@/assets/categories/indoor-plants.jpg";
import shrubsImg from "@/assets/categories/shrubs.jpg";
import succulentsImg from "@/assets/categories/succulents-cacti.jpg";
import treesImg from "@/assets/categories/trees.jpg";
import vegetablesImg from "@/assets/categories/vegetables.jpg";
import vinesImg from "@/assets/categories/vines-climbers.jpg";

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

export interface CategoryDetail {
  name: PlantCategory;
  slug: string;
  description: string;
  image: string;
}

/** Description and representative photo for each category, in the required order. */
export const CATEGORY_DETAILS: readonly CategoryDetail[] = [
  {
    name: "Indoor plants",
    slug: "indoor-plants",
    description: "Leafy companions for bright rooms, shady corners and kitchen shelves.",
    image: indoorImg,
  },
  {
    name: "Succulents and cacti",
    slug: "succulents-cacti",
    description: "Water-wise plants that love sun, sharp drainage and a little neglect.",
    image: succulentsImg,
  },
  {
    name: "Herbs",
    slug: "herbs",
    description: "Fragrant, useful plants for windowsills, pots and kitchen beds.",
    image: herbsImg,
  },
  {
    name: "Flowers",
    slug: "flowers",
    description: "Colour for borders and meadows, many loved by bees and butterflies.",
    image: flowersImg,
  },
  {
    name: "Vines and climbers",
    slug: "vines-climbers",
    description: "Climbers that soften fences, walls and trellises with leaves and blooms.",
    image: vinesImg,
  },
  {
    name: "Shrubs",
    slug: "shrubs",
    description: "Structure and shelter, including tough California natives.",
    image: shrubsImg,
  },
  {
    name: "Trees",
    slug: "trees",
    description: "Long-lived shade and character for yards and courtyards.",
    image: treesImg,
  },
  {
    name: "Aquatic plants",
    slug: "aquatic-plants",
    description: "Lilies, lotus and reeds for ponds, bowls and water features.",
    image: aquaticImg,
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    description: "Seasonal crops for raised beds, containers and kitchen gardens.",
    image: vegetablesImg,
  },
  {
    name: "Fruit",
    slug: "fruit",
    description: "Citrus, figs and berries that thrive in California sunshine.",
    image: fruitImg,
  },
];

export function categoryDetail(name: PlantCategory): CategoryDetail {
  return CATEGORY_DETAILS.find((c) => c.name === name) ?? CATEGORY_DETAILS[0]!;
}

export function categoryBySlug(slug: string | undefined): CategoryDetail | undefined {
  return CATEGORY_DETAILS.find((c) => c.slug === slug);
}
