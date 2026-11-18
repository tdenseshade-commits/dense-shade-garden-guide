import { addDays, format } from "date-fns";
import { useSyncExternalStore } from "react";

import { getSpecies } from "./catalog";
import { DEMO_VERSION, makeSeed } from "./seed";
import type { CareTask, CareType, DemoSettings, DemoState, GardenPlant, Health, TaskStatus } from "./types";

const KEY = "denseshade-demo-v1";
const listeners = new Set<() => void>();
let state: DemoState | null = null;

const today = () => format(new Date(), "yyyy-MM-dd");
let counter = 0;
const uid = (p: string) => `${p}-${Date.now().toString(36)}${(counter++).toString(36)}`;

function load(): DemoState {
  if (state) return state;
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed = raw ? (JSON.parse(raw) as DemoState) : null;
      if (parsed?.version === DEMO_VERSION) return (state = parsed);
    } catch {
      /* fall through to a fresh seed */
    }
  }
  return (state = makeSeed());
}

function commit(next: DemoState) {
  state = next;
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Reactive access to the shared mock data. */
export function useDemo(): DemoState {
  return useSyncExternalStore(subscribe, load, load);
}

export function taskStatus(task: CareTask, on: string = today()): TaskStatus {
  if (task.completedAt) return "completed";
  if (task.dueOn < on) return "overdue";
  if (task.dueOn === on) return "today";
  return "upcoming";
}

export const CARE_LABELS: Record<CareType, string> = {
  water: "Water",
  fertilise: "Fertilise",
  prune: "Prune",
  clean: "Clean leaves",
  repot: "Repot",
  inspect: "Inspect",
};

export const HEALTH_LABELS: Record<Health, string> = {
  thriving: "Thriving",
  healthy: "Healthy",
  needs_attention: "Needs attention",
  struggling: "Struggling",
};

export const demo = {
  get: load,
  reset() {
    commit(makeSeed());
  },
  addPlant(speciesId: string, input: { nickname?: string; location?: string } = {}): GardenPlant {
    const s = load();
    const species = getSpecies(speciesId);
    if (!species) throw new Error("Unknown plant");
    const plant: GardenPlant = {
      id: uid("p"),
      speciesId,
      nickname: input.nickname?.trim() || species.commonName,
      location: input.location?.trim() || "Not set yet",
      health: "healthy",
      notes: "",
      addedOn: today(),
      archived: false,
      observations: [],
    };
    const tasks: CareTask[] = [
      { id: uid("t"), plantId: plant.id, type: "water", dueOn: today(), repeatEveryDays: species.waterEveryDays, completedAt: null, note: "" },
    ];
    if (species.feedEveryDays)
      tasks.push({ id: uid("t"), plantId: plant.id, type: "fertilise", dueOn: format(addDays(new Date(), species.feedEveryDays), "yyyy-MM-dd"), repeatEveryDays: species.feedEveryDays, completedAt: null, note: "" });
    commit({ ...s, plants: [plant, ...s.plants], tasks: [...s.tasks, ...tasks] });
    return plant;
  },
  updatePlant(id: string, patch: Partial<Pick<GardenPlant, "nickname" | "location" | "health" | "notes" | "archived">>) {
    const s = load();
    commit({ ...s, plants: s.plants.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  },
  addObservation(plantId: string, text: string) {
    const s = load();
    const obs = { id: uid("o"), date: new Date().toISOString(), text: text.trim() };
    commit({ ...s, plants: s.plants.map((p) => (p.id === plantId ? { ...p, observations: [obs, ...p.observations] } : p)) });
  },
  /** Marks a task done, records it in care history and schedules the next repeat. */
  completeTask(taskId: string) {
    const s = load();
    const task = s.tasks.find((t) => t.id === taskId);
    if (!task || task.completedAt) return;
    const at = new Date().toISOString();
    const tasks = s.tasks.map((t) => (t.id === taskId ? { ...t, completedAt: at } : t));
    if (task.repeatEveryDays)
      tasks.push({ ...task, id: uid("t"), completedAt: null, dueOn: format(addDays(new Date(), task.repeatEveryDays), "yyyy-MM-dd") });
    const log = { id: uid("l"), plantId: task.plantId, type: task.type, doneAt: at, note: task.note, taskId };
    commit({ ...s, tasks, logs: [log, ...s.logs] });
  },
  toggleLike(postId: string, userId = "me") {
    const s = load();
    commit({
      ...s,
      posts: s.posts.map((p) =>
        p.id !== postId ? p : { ...p, likedBy: p.likedBy.includes(userId) ? p.likedBy.filter((u) => u !== userId) : [...p.likedBy, userId] },
      ),
    });
  },
  addComment(postId: string, text: string) {
    const s = load();
    const c = { id: uid("c"), userId: "me", text: text.trim(), postedAt: new Date().toISOString() };
    commit({ ...s, posts: s.posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, c] } : p)) });
  },
  updateSettings(patch: Partial<DemoSettings>) {
    const s = load();
    commit({ ...s, settings: { ...s.settings, ...patch } });
  },
};
