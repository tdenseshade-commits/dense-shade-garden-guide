import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Droplets } from "lucide-react";

import { ComingSoon } from "@/components/common/ComingSoon";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { EmptyState } from "@/components/common/StateViews";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/care")({
  head: () => pageMeta("Care", "Simple care tasks, reminders and notes for your plants."),
  component: CarePage,
});

function CarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Care"
        title="Gentle care, on time"
        description="Your tasks and care notes, kept simple."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Upcoming tasks">
          <EmptyState
            icon={Droplets}
            title="No care tasks yet"
            description="Tasks will appear here once your plants are in My Garden."
          />
        </SectionCard>
        <SectionCard title="Reminders" action={<ComingSoon />}>
          <EmptyState
            icon={BellRing}
            title="Reminders are not on yet"
            description="Care reminders will be added in a later step."
          />
        </SectionCard>
      </div>
    </>
  );
}
