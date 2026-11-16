import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/AppShell";
import { profileQueryOptions } from "@/lib/profile";

// The five main destinations. New accounts finish onboarding first.
export const Route = createFileRoute("/_authenticated/_main")({
  beforeLoad: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(profileQueryOptions(context.user.id));
    if (!profile?.onboarding_completed_at) throw redirect({ to: "/onboarding" });
  },
  component: MainLayout,
});

function MainLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
