import type { PlantCategory } from "@/lib/categories";
import type { ExplanationLevel, ExperienceLevel } from "@/lib/profile-options";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

/** A catalogue plant (Discover). Garden plants point at one of these. */
export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  category: PlantCategory;
  summary: string;
  light: string;
  water: string;
  difficulty: Difficulty;
  waterEveryDays: number;
  feedEveryDays: number | null;
  care: Record<ExplanationLevel, string>;
  californiaTip: string;
  tags: readonly string[];
}

export type Health = "thriving" | "healthy" | "needs_attention" | "struggling";

export type CareType = "water" | "fertilise" | "prune" | "clean" | "repot" | "inspect";

export interface Observation {
  id: string;
  date: string; // ISO datetime
  text: string;
}

export interface GardenPlant {
  id: string;
  speciesId: string;
  nickname: string;
  location: string;
  health: Health;
  notes: string;
  addedOn: string; // yyyy-MM-dd
  archived: boolean;
  observations: Observation[];
}

export interface CareTask {
  id: string;
  plantId: string;
  type: CareType;
  dueOn: string; // yyyy-MM-dd
  repeatEveryDays: number | null;
  completedAt: string | null; // ISO datetime
  note: string;
}

export interface CareLog {
  id: string;
  plantId: string;
  type: CareType;
  doneAt: string; // ISO datetime
  note: string;
  taskId: string | null;
}

/** Sample community member. "me" is reserved for the signed-in person. */
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  region: string;
  experience: ExperienceLevel;
  bio: string;
  avatar: PlantCategory;
  joinedOn: string;
}

export interface FeedComment {
  id: string;
  userId: string;
  text: string;
  postedAt: string;
}

export interface FeedPost {
  id: string;
  userId: string;
  speciesId: string;
  plantId: string | null; // set when the post is about one of "my" garden plants
  caption: string;
  postedAt: string;
  likedBy: string[];
  comments: FeedComment[];
}

export interface DemoSettings {
  avatar: PlantCategory | null;
  notifications: {
    careReminders: boolean;
    weeklySummary: boolean;
    seasonalTips: boolean;
    communityActivity: boolean;
  };
  reminderTime: string; // HH:mm
}

export interface DemoState {
  version: number;
  seededAt: string;
  plants: GardenPlant[];
  tasks: CareTask[];
  logs: CareLog[];
  posts: FeedPost[];
  settings: DemoSettings;
}

export type TaskStatus = "overdue" | "today" | "upcoming" | "completed";
