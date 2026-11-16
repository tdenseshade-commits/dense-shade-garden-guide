import type { QueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

/** Sign out and drop all cached private data before leaving the signed-in area. */
export async function signOutEverywhere(queryClient: QueryClient) {
  await queryClient.cancelQueries();
  queryClient.clear();
  await supabase.auth.signOut();
}
