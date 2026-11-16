import type { Database } from "@/integrations/supabase/types";

export type ExperienceLevel = Database["public"]["Enums"]["experience_level"];
export type ExplanationLevel = Database["public"]["Enums"]["explanation_level"];

/** California growing regions offered in onboarding. Codes must match the database check. */
export const CALIFORNIA_REGIONS = [
  { value: "north_coast", label: "North Coast" },
  { value: "far_north", label: "Far North and Shasta Cascade" },
  { value: "bay_area", label: "San Francisco Bay Area" },
  { value: "central_coast", label: "Central Coast" },
  { value: "central_valley", label: "Central Valley" },
  { value: "sierra_foothills", label: "Sierra Nevada and foothills" },
  { value: "southern_coast", label: "Southern California coast" },
  { value: "inland_southern", label: "Inland Southern California" },
  { value: "desert", label: "Desert regions" },
] as const;

export type RegionCode = (typeof CALIFORNIA_REGIONS)[number]["value"];

export const EXPERIENCE_LEVELS: readonly { value: ExperienceLevel; label: string; hint: string }[] = [
  { value: "beginner", label: "Beginner", hint: "I'm just getting started" },
  { value: "intermediate", label: "Intermediate", hint: "I keep a few plants happy" },
  { value: "advanced", label: "Advanced", hint: "I know my way around a garden" },
];

export const EXPLANATION_LEVELS: readonly { value: ExplanationLevel; label: string; hint: string }[] = [
  { value: "simple", label: "Simple", hint: "Short, plain steps" },
  { value: "standard", label: "Standard", hint: "Steps with a little why" },
  { value: "advanced", label: "Advanced", hint: "Full detail and terms" },
];

export function regionLabel(code: string | null | undefined) {
  return CALIFORNIA_REGIONS.find((r) => r.value === code)?.label ?? "Not set";
}
