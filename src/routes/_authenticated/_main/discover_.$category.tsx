import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { SpeciesCard } from "@/components/plants/PlantBits";
import { Button } from "@/components/ui/button";
import { categoryBySlug } from "@/lib/categories";
import { SPECIES } from "@/lib/demo/catalog";
import { useDemo } from "@/lib/demo/store";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/discover_/$category")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(loaderData.category.name, loaderData.category.description)
      : pageMeta("Category", "Browse plants by category."),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { plants } = useDemo();
  const owned = new Set(plants.filter((p) => !p.archived).map((p) => p.speciesId));
  const list = SPECIES.filter((s) => s.category === category.name);
  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4">
        <Link to="/discover"><ArrowLeft aria-hidden />Discover</Link>
      </Button>
      <img src={category.image} alt={category.name} className="mb-6 aspect-[3/1] w-full rounded-3xl object-cover" />
      <PageHeader eyebrow="Category" title={category.name} description={category.description} />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((s) => (
          <li key={s.id}><SpeciesCard species={s} inGarden={owned.has(s.id)} /></li>
        ))}
      </ul>
    </>
  );
}
