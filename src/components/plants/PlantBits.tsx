import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSpecies, speciesImage } from "@/lib/demo/catalog";
import { CARE_LABELS, HEALTH_LABELS, demo, taskStatus } from "@/lib/demo/store";
import type { CareTask, GardenPlant, Health, Species } from "@/lib/demo/types";
import { cn } from "@/lib/utils";

/** Labels anything that is a simulated demonstration rather than a real service. */
export function DemoBadge({ label = "Simulated demo" }: { label?: string }) {
  return <Badge variant="soft">{label}</Badge>;
}

export function HealthBadge({ health }: { health: Health }) {
  const tone = health === "struggling" || health === "needs_attention" ? "highlight" : "soft";
  return <Badge variant={tone}>{HEALTH_LABELS[health]}</Badge>;
}

export function SpeciesCard({ species, inGarden }: { species: Species; inGarden?: boolean }) {
  return (
    <Link
      to="/plants/$speciesId"
      params={{ speciesId: species.id }}
      className="group flex flex-col overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-soft"
    >
      <img src={speciesImage(species)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-semibold leading-snug">{species.commonName}</p>
        <p className="text-sm italic text-muted-foreground">{species.scientificName}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-snug">{species.summary}</p>
        <dl className="mt-2 space-y-0.5 text-xs text-muted-foreground">
          <div className="flex gap-1"><dt className="font-semibold">Light:</dt><dd className="line-clamp-1">{species.light}</dd></div>
          <div className="flex gap-1"><dt className="font-semibold">Water:</dt><dd className="line-clamp-1">{species.water}</dd></div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <Badge variant="outline">{species.difficulty}</Badge>
          {inGarden && <Badge variant="soft">In my garden</Badge>}
        </div>
      </div>
    </Link>
  );
}

export function GardenPlantCard({ plant }: { plant: GardenPlant }) {
  const species = getSpecies(plant.speciesId);
  if (!species) return null;
  return (
    <Link
      to="/garden/$plantId"
      params={{ plantId: plant.id }}
      className="flex items-center gap-4 rounded-3xl border bg-card p-3 transition-shadow hover:shadow-soft"
    >
      <img src={speciesImage(species)} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{plant.nickname}</p>
        <p className="truncate text-sm text-muted-foreground">
          {species.commonName} · {plant.location}
        </p>
      </div>
      <HealthBadge health={plant.health} />
    </Link>
  );
}

const STATUS_LABEL = { overdue: "Overdue", today: "Due today", upcoming: "Upcoming", completed: "Done" } as const;

export function TaskRow({ task, plant, showPlant = true }: { task: CareTask; plant?: GardenPlant; showPlant?: boolean }) {
  const status = taskStatus(task);
  const done = status === "completed";
  return (
    <li className="flex items-center gap-3 rounded-2xl border bg-background/60 p-3">
      <div className="min-w-0 flex-1">
        <p className={cn("font-medium", done && "text-muted-foreground line-through")}>
          {CARE_LABELS[task.type]}
          {showPlant && plant && (
            <>
              {" · "}
              <Link to="/garden/$plantId" params={{ plantId: plant.id }} className="underline-offset-2 hover:underline">
                {plant.nickname}
              </Link>
            </>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className={cn(status === "overdue" && "font-semibold text-highlight")}>{STATUS_LABEL[status]}</span>
          {" · "}
          {format(parseISO(done && task.completedAt ? task.completedAt : task.dueOn), "EEE d MMM")}
          {task.note && ` · ${task.note}`}
        </p>
      </div>
      {!done && (
        <Button size="sm" variant="outline" onClick={() => demo.completeTask(task.id)} aria-label={`Mark ${CARE_LABELS[task.type]} done`}>
          <Check aria-hidden />
          Done
        </Button>
      )}
    </li>
  );
}
