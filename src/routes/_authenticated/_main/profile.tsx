import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { PreferencesForm } from "@/components/auth/PreferencesForm";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { signOutEverywhere } from "@/lib/auth";
import { profileQueryOptions, savePreferences } from "@/lib/profile";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/profile")({
  head: () => pageMeta("Profile", "Your DenseShade account and preferences."),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQueryOptions(context.user.id)),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQueryOptions(user.id));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOutEverywhere(queryClient);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title={profile?.display_name ? `Hello, ${profile.display_name}` : "Your account"}
        description="Your account and how DenseShade talks to you."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <SectionCard title="Your preferences" description="Change these any time.">
          <PreferencesForm
            key={profile?.updated_at}
            initial={profile}
            submitLabel="Save preferences"
            onSubmit={async (prefs) => {
              const saved = await savePreferences(user.id, prefs);
              queryClient.setQueryData(profileQueryOptions(user.id).queryKey, saved);
              toast.success("Preferences saved.");
            }}
          />
        </SectionCard>
        <SectionCard title="Account" className="h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Email</p>
          <p className="mt-1 break-all text-sm font-medium">{user.email}</p>
          <Button variant="outline" className="mt-6 w-full" onClick={handleSignOut}>
            <LogOut aria-hidden />
            Sign out
          </Button>
        </SectionCard>
      </div>
    </>
  );
}
