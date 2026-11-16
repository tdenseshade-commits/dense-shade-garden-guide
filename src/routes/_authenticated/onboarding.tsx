import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { PreferencesForm } from "@/components/auth/PreferencesForm";
import { Button } from "@/components/ui/button";
import { signOutEverywhere } from "@/lib/auth";
import { profileQueryOptions, savePreferences } from "@/lib/profile";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => pageMeta("Welcome", "A few quick questions to set up DenseShade for your garden."),
  beforeLoad: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(profileQueryOptions(context.user.id));
    if (profile?.onboarding_completed_at) throw redirect({ to: "/" });
    return { profile };
  },
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user, profile } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Welcome to DenseShade"
      description="Four quick questions so care advice suits you and your garden."
    >
      <PreferencesForm
        initial={profile}
        submitLabel="Start gardening"
        onSubmit={async (prefs) => {
          const saved = await savePreferences(user.id, prefs, { completeOnboarding: true });
          queryClient.setQueryData(profileQueryOptions(user.id).queryKey, saved);
          await navigate({ to: "/", replace: true });
        }}
      />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Signed in as {user.email}.{" "}
        <Button
          variant="link"
          className="h-auto p-0 text-sm"
          onClick={async () => {
            await signOutEverywhere(queryClient);
            navigate({ to: "/auth", replace: true });
          }}
        >
          Not you? Sign out
        </Button>
      </p>
    </AuthLayout>
  );
}
