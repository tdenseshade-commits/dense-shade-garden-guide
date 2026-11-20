import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Pencil, Sprout } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/FormField";
import { NativeSelect } from "@/components/forms/NativeSelect";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { EmptyState } from "@/components/common/StateViews";
import { HealthBadge, TaskRow } from "@/components/plants/PlantBits";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSpecies, speciesImage } from "@/lib/demo/catalog";
import { CARE_LABELS, HEALTH_LABELS, demo, useDemo } from "@/lib/demo/store";
import type { GardenPlant, Health } from "@/lib/demo/types";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/garden_/$plantId")({
  head: () => pageMeta("Plant profile", "Care, history and notes for one of your plants."),
  component: PlantPage,
});

function PlantPage() {
  const { plantId } = Route.useParams();
  const { plants, tasks, logs } = useDemo();
  const [note, setNote] = useState("");
  const plant = plants.find((p) => p.id === plantId);
  const species = plant && getSpecies(plant.speciesId);
  if (!plant || !species)
    return <EmptyState icon={Sprout} title="Plant not found" action={<Button asChild><Link to="/garden">Back to My Garden</Link></Button>} />;

  const open = tasks.filter((t) => t.plantId === plant.id && !t.completedAt).sort((a, b) => a.dueOn.localeCompare(b.dueOn));
  const history = logs.filter((l) => l.plantId === plant.id).sort((a, b) => b.doneAt.localeCompare(a.doneAt));

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4">
        <Link to="/garden"><ArrowLeft aria-hidden />My Garden</Link>
      </Button>
      <img src={speciesImage(species)} alt={species.commonName} className="mb-6 aspect-[2/1] w-full rounded-3xl object-cover" />
      <PageHeader
        eyebrow={`${species.commonName} · ${species.scientificName}`}
        title={plant.nickname}
        description={plant.location}
        actions={<EditPlant plant={plant} />}
      />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <HealthBadge health={plant.health} />
        <span className="text-sm text-muted-foreground">Added {format(parseISO(plant.addedOn), "d MMM yyyy")}</span>
        <Link to="/plants/$speciesId" params={{ speciesId: species.id }} className="text-sm text-sage underline-offset-2 hover:underline">Care guide</Link>
        <Link to="/assistant" search={{ tab: "health", plant: plant.id }} className="text-sm text-sage underline-offset-2 hover:underline">Check health (demo)</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Care tasks" description={`${species.light} · ${species.water}`}>
          {open.length ? <ul className="space-y-2">{open.map((t) => <TaskRow key={t.id} task={t} showPlant={false} />)}</ul> : <p className="text-sm text-muted-foreground">Nothing scheduled.</p>}
        </SectionCard>
        <SectionCard title="Care history">
          {history.length ? (
            <ul className="space-y-2 text-sm">
              {history.slice(0, 8).map((l) => (
                <li key={l.id} className="flex justify-between gap-3"><span>{CARE_LABELS[l.type]}</span><span className="text-muted-foreground">{format(parseISO(l.doneAt), "d MMM")}</span></li>
              ))}
            </ul>
          ) : <p className="text-sm text-muted-foreground">No care logged yet.</p>}
        </SectionCard>
        <SectionCard title="Growth observations" className="lg:col-span-2">
          <form className="mb-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!note.trim()) return; demo.addObservation(plant.id, note); setNote(""); }}>
            <Input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} placeholder="New leaf, first flower…" aria-label="New observation" />
            <Button type="submit" disabled={!note.trim()}>Add</Button>
          </form>
          <ul className="space-y-3">
            {plant.observations.map((o) => (
              <li key={o.id} className="text-sm"><span className="text-muted-foreground">{format(parseISO(o.date), "d MMM")} · </span>{o.text}</li>
            ))}
          </ul>
        </SectionCard>
      </div>
      <Button variant="ghost" className="mt-6" onClick={() => { demo.updatePlant(plant.id, { archived: !plant.archived }); toast.success(plant.archived ? "Plant restored." : "Plant archived."); }}>
        {plant.archived ? "Restore to garden" : "Archive plant"}
      </Button>
    </>
  );
}

function EditPlant({ plant }: { plant: GardenPlant }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(plant);
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setForm(plant); }}>
      <DialogTrigger asChild><Button variant="outline"><Pencil aria-hidden />Edit</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit {plant.nickname}</DialogTitle></DialogHeader>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          demo.updatePlant(plant.id, { nickname: form.nickname.trim() || plant.nickname, location: form.location, health: form.health, notes: form.notes });
          setOpen(false);
          toast.success("Plant updated.");
        }}>
          <FormField label="Nickname"><Input value={form.nickname} maxLength={40} onChange={(e) => setForm({ ...form, nickname: e.target.value })} /></FormField>
          <FormField label="Location"><Input value={form.location} maxLength={60} onChange={(e) => setForm({ ...form, location: e.target.value })} /></FormField>
          <FormField label="Health">
            <NativeSelect value={form.health} onChange={(e) => setForm({ ...form, health: e.target.value as Health })}>
              {Object.entries(HEALTH_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </NativeSelect>
          </FormField>
          <FormField label="Notes"><Textarea value={form.notes} maxLength={300} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></FormField>
          <DialogFooter><Button type="submit">Save</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
