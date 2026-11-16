import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Preferences } from "./auth-schemas";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const profileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

/** Saves the signed-in person's preferences. RLS limits this to their own row. */
export async function savePreferences(
  userId: string,
  prefs: Preferences,
  opts: { completeOnboarding?: boolean } = {},
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      display_name: prefs.displayName,
      growing_region: prefs.region,
      experience_level: prefs.experience,
      explanation_level: prefs.explanation,
      ...(opts.completeOnboarding ? { onboarding_completed_at: new Date().toISOString() } : {}),
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}
