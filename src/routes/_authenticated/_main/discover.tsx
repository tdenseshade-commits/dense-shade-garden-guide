import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/StateViews";
import { SpeciesCard } from "@/components/plants/PlantBits";
import { Input } from "@/components/ui/input";
import { CATEGORY_DETAILS } from "@/lib/categories";
import { SPECIES, matchesSearch } from "@/lib/demo/catalog";
import { useDemo } from "@/lib/demo/store";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/discover")({
  head: () => pageMeta("Discover", "Explore plants by category and find something new to grow."),
  validateSearch: (s: Record<string, unknown>): { q?: string } =>
    typeof s["q"] === "string" && s["q"] ? { q: s["q"] } : {},
  component: DiscoverPage,
});

function DiscoverPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { plants } = useDemo();
  const owned = new Set(plants.filter((p) => !p.archived).map((p) => p.speciesId));
  const results = q.trim() ? SPECIES.filter((s) => matchesSearch(s, q)) : [];

  return (
    <>
      <PageHeader eyebrow="Discover" title="Find your next plant" description="Browse by category or search the catalogue." />
      <div className="relative mb-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          value={q}
          onChange={(e) => navigate({ search: e.target.value ? { q: e.target.value } : {}, replace: true })}
          placeholder="Search by name, category or trait"
          aria-label="Search plants"
          className="pl-11"
        />
      </div>

      {q.trim() ? (
        <section aria-labelledby="results" className="space-y-3">
          <h2 id="results" className="text-lg font-semibold">
            {results.length} {results.length === 1 ? "plant" : "plants"} found
          </h2>
          {results.length ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {results.map((s) => (
                <li key={s.id}><SpeciesCard species={s} inGarden={owned.has(s.id)} /></li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={Search} title="No plants match" description="Try a different name, like 'lemon' or 'low light'." />
          )}
        </section>
      ) : (
        <section aria-labelledby="categories" className="space-y-3">
          <h2 id="categories" className="text-lg font-semibold">Categories</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CATEGORY_DETAILS.map((c) => {
              const count = SPECIES.filter((s) => s.category === c.name).length;
              return (
                <li key={c.slug}>
                  <Link
                    to="/discover/$category"
                    params={{ category: c.slug }}
                    className="flex overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-soft"
                  >
                    <img src={c.image} alt="" loading="lazy" className="h-28 w-28 shrink-0 object-cover sm:h-32 sm:w-32" />
                    <div className="min-w-0 p-4">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-1 text-sm leading-snug text-muted-foreground">{c.description}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-sage">{count} plants</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
