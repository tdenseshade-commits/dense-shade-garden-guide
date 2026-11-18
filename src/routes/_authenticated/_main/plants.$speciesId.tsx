import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AddToGarden } from "@/components/plants/AddToGarden";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryDetail } from "@/lib/categories";
import { getSpecies, speciesImage } from "@/lib/demo/catalog";
import { useDemo } from "@/lib/demo/store";
import { EXPLANATION_LEVELS } from "@/lib/profile-options";
import { profileQueryOptions } from "@/lib/profile";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/plants/$speciesId")({
  loader: ({ params }) => {
    const species = getSpecies(params.speciesId);
    if (!species) throw notFound();
    return { species };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(loaderData.species.commonName, loaderData.species.summary)
      : pageMeta("Plant", "Plant care details."),
  component: SpeciesPage,
});

function SpeciesPage() {
  const { species } = Route.useLoaderData();
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQueryOptions(user.id));
  const { plants } = useDemo();
  const mine = plants.filter((p) => p.speciesId === species.id && !p.archived);
  const category = categoryDetail(species.category);

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4">
        <Link to="/discover/$category" params={{ category: category.slug }}><ArrowLeft aria-hidden />{category.name}</Link>
      </Button>
      <img src={speciesImage(species)} alt={species.commonName} className="mb-6 aspect-[2/1] w-full rounded-3xl object-cover" />
      <PageHeader eyebrow={species.category} title={species.commonName} description={species.summary} actions={<AddToGarden speciesId={species.id} name={species.commonName} />} />
      <p className="-mt-6 mb-6 italic text-muted-foreground">{species.scientificName}</p>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <SectionCard title="How to care for it">
          <Tabs defaultValue={profile?.explanation_level ?? "standard"}>
            <TabsList>
              {EXPLANATION_LEVELS.map((l) => <TabsTrigger key={l.value} value={l.value}>{l.label}</TabsTrigger>)}
            </TabsList>
            {EXPLANATION_LEVELS.map((l) => (
              <TabsContent key={l.value} value={l.value} className="leading-relaxed">{species.care[l.value]}</TabsContent>
            ))}
          </Tabs>
          <p className="mt-4 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-pine"><strong>California tip: </strong>{species.californiaTip}</p>
        </SectionCard>
        <SectionCard title="At a glance" className="h-fit">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-muted-foreground">Light</dt><dd className="font-medium">{species.light}</dd></div>
            <div><dt className="text-muted-foreground">Water</dt><dd className="font-medium">{species.water}</dd></div>
            <div><dt className="text-muted-foreground">Difficulty</dt><dd className="font-medium">{species.difficulty}</dd></div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5">{species.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}</div>
          {mine.length > 0 && (
            <div className="mt-6 space-y-2">
              <p className="text-sm font-semibold">In my garden</p>
              {mine.map((p) => (
                <Link key={p.id} to="/garden/$plantId" params={{ plantId: p.id }} className="block text-sm text-sage underline-offset-2 hover:underline">{p.nickname}</Link>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}

