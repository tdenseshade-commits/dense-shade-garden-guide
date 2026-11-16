import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { PLANT_CATEGORIES } from "@/lib/categories";
import { NAV_ITEMS } from "@/lib/navigation";
import { routeTree } from "@/routeTree.gen";

describe("Main navigation", () => {
  it("has exactly the five destinations in order", () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Today",
      "My Garden",
      "Discover",
      "Care",
      "Profile",
    ]);
  });

  it("every destination resolves to a real page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const item of NAV_ITEMS) {
      const leaf = router.matchRoutes(item.to).at(-1);
      expect(leaf?.routeId).not.toBe(rootRouteId);
      expect(leaf?.pathname).toBe(item.to);
    }
  });
});

describe("Plant categories", () => {
  it("keeps the required order", () => {
    expect(PLANT_CATEGORIES).toEqual([
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
    ]);
  });
});
