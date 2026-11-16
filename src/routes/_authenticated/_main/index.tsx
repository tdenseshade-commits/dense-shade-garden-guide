import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, MessageCircleQuestion, Sprout } from "lucide-react";

import { ComingSoon } from "@/components/common/ComingSoon";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { EmptyState } from "@/components/common/StateViews";
import { Button } from "@/components/ui/button";
import { profileQueryOptions } from "@/lib/profile";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/_main/")({
  head: () =>
    pageMeta("Today", "See what your garden needs today, at a calm and easy pace."),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQueryOptions(context.user.id)),
  component: TodayPage,
});

const contextualActions = [
  { label: "Scan a plant", icon: Camera, hint: "Identify a plant from a photo" },
  { label: "Ask DenseShade", icon: MessageCircleQuestion, hint: "Get gentle care guidance" },
];

function TodayPage() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQueryOptions(user.id));
  return (
    <>
      <PageHeader
        eyebrow={profile?.display_name ? `Today · Hello, ${profile.display_name}` : "Today"}
        title="Peace in your garden."
        description="Ease in your day. Here's what your plants need, nothing more."
      />

      <div className="space-y-6">
        <section className="bg-canopy relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-soft md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Your garden
          </p>
          <h2 className="mt-2 max-w-md text-2xl font-semibold leading-snug md:text-3xl">
            Less time managing. More time growing.
          </h2>
          <Button asChild variant="highlight" className="mt-6">
            <Link to="/garden">
              <Sprout aria-hidden />
              Go to My Garden
            </Link>
          </Button>
        </section>

        <SectionCard title="Today's care" description="Watering, feeding and gentle check-ins.">
          <EmptyState
            title="Nothing to do today"
            description="Once you add plants, their care tasks will appear here."
            action={
              <Button asChild variant="outline">
                <Link to="/care">View care</Link>
              </Button>
            }
          />
        </SectionCard>

        <section aria-labelledby="quick-help" className="space-y-3">
          <h2 id="quick-help" className="text-lg font-semibold">
            Quick help
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {contextualActions.map(({ label, icon: Icon, hint }) => (
              <div
                key={label}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border bg-card p-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-sage">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{label}</p>
                  <p className="text-sm leading-snug text-muted-foreground">{hint}</p>
                </div>
                <ComingSoon />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
