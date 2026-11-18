import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Sprout } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/StateViews";
import { GardenPlantCard } from "@/components/plants/PlantBits";
import { Button } from "@/components/ui/button";
import { PLANT_CATEGORIES } from "@/lib/categories";
import { getSpecies } from "@/lib/demo/catalog";
import { useDemo } from "@/lib/demo/store";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/_main/garden")({
  head: () => pageMeta("My Garden", "All of your plants in one calm, simple place."),
  validateSearch: (s: Record<string, unknown>): { category?: string } =>
    typeof s["category"] === "string" ? { category: s["category"] } : {},
  component: GardenPage,
});

function GardenPage() {
  const { category } = Route.useSearch();
  const { plants } = useDemo();
  const active = plants.filter((p) => !p.archived);
  const shown = active.filter((p) => !category || getSpecies(p.speciesId)?.category === category);
  const used = PLANT_CATEGORIES.filter((c) => active.some((p) => getSpecies(p.speciesId)?.category === c));

  return (
    <>
      <PageHeader
        eyebrow="My Garden"
        title="Your plants"
        description={`${active.length} plants, gathered in one place.`}
        actions={<Button asChild><Link to="/discover"><Plus aria-hidden />Add plant</Link></Button>}
      />
      <div className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {[undefined, ...used].map((c) => (
          <Link
            key={c ?? "all"}
            to="/garden"
            search={c ? { category: c } : {}}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium",
              category === c ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {c ?? "All"}
          </Link>
        ))}
      </div>
      {shown.length ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {shown.map((p) => <li key={p.id}><GardenPlantCard plant={p} /></li>)}
        </ul>
      ) : (
        <EmptyState icon={Sprout} title="No plants here yet" description="Find one in Discover and add it to your garden." />
      )}
    </>
  );
}
