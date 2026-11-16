import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { ComingSoon } from "@/components/common/ComingSoon";
import { PageHeader } from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { PLANT_CATEGORIES } from "@/lib/categories";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/discover")({
  head: () => pageMeta("Discover", "Explore plants by category and find something new to grow."),
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discover"
        title="Find your next plant"
        description="Browse by category. The plant catalogue is on its way."
      />
      <div className="relative mb-8">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search plants (coming soon)"
          aria-label="Search plants"
          className="pl-11"
          disabled
        />
      </div>
      <section aria-labelledby="categories" className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 id="categories" className="text-lg font-semibold">
            Categories
          </h2>
          <ComingSoon label="Catalogue coming soon" />
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PLANT_CATEGORIES.map((category) => (
            <li
              key={category}
              className="flex min-h-24 items-end rounded-3xl border bg-card p-4 text-sm font-semibold leading-snug"
            >
              {category}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
