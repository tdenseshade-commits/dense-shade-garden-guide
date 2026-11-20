import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { BellRing, Leaf, Sun } from "lucide-react";

import { ComingSoon } from "@/components/common/ComingSoon";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { EmptyState } from "@/components/common/StateViews";
import { GardenPlantCard, TaskRow } from "@/components/plants/PlantBits";
import { CARE_LABELS, taskStatus, useDemo } from "@/lib/demo/store";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/care")({
  head: () => pageMeta("Care", "Simple care tasks, reminders and notes for your plants."),
  component: CarePage,
});

function CarePage() {
  const { tasks, logs, plants } = useDemo();
  const active = plants.filter((p) => !p.archived);
  const activeIds = new Set(active.map((p) => p.id));
  const open = tasks.filter((t) => !t.completedAt && activeIds.has(t.plantId)).sort((a, b) => a.dueOn.localeCompare(b.dueOn));
  const due = open.filter((t) => taskStatus(t) !== "upcoming");
  const upcoming = open.filter((t) => taskStatus(t) === "upcoming").slice(0, 8);
  const recent = [...logs].sort((a, b) => b.doneAt.localeCompare(a.doneAt)).slice(0, 8);
  const attention = active.filter((p) => p.health === "needs_attention" || p.health === "struggling");
  const name = (id: string) => plants.find((p) => p.id === id)?.nickname ?? "Plant";

  return (
    <>
      <PageHeader eyebrow="Care" title="Gentle care, on time" description="A few small things for your plants. Move anything to another day whenever you like." />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Due today" description="Including anything still waiting - no pressure.">
          {due.length ? <ul className="space-y-2">{due.map((t) => <TaskRow key={t.id} task={t} />)}</ul> : <EmptyState icon={Sun} title="All caught up" description="Nothing needs you today. Enjoy the garden." />}
        </SectionCard>
        <SectionCard title="Coming up">
          {upcoming.length ? <ul className="space-y-2">{upcoming.map((t) => <TaskRow key={t.id} task={t} />)}</ul> : <p className="text-sm text-muted-foreground">Nothing planned yet.</p>}
        </SectionCard>
        <SectionCard title="Plants needing attention" description="A little extra care can help.">
          {attention.length ? <div className="space-y-2">{attention.map((p) => <GardenPlantCard key={p.id} plant={p} />)}</div> : <EmptyState icon={Leaf} title="Everyone looks happy" />}
        </SectionCard>
        <SectionCard title="Recently completed">
          {recent.length ? (
            <ul className="space-y-2 text-sm">
              {recent.map((l) => (
                <li key={l.id} className="flex justify-between gap-3">
                  <span>{CARE_LABELS[l.type]} · <Link to="/garden/$plantId" params={{ plantId: l.plantId }} className="underline-offset-2 hover:underline">{name(l.plantId)}</Link></span>
                  <span className="text-muted-foreground">{format(parseISO(l.doneAt), "d MMM")}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-muted-foreground">No care logged yet.</p>}
        </SectionCard>
        <SectionCard title="Reminders" action={<ComingSoon />} className="lg:col-span-2">
          <EmptyState icon={BellRing} title="Reminders are not on yet" description="Phone notifications are not connected in this prototype." />
        </SectionCard>
      </div>
    </>
  );
}
