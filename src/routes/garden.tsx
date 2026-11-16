import { createFileRoute } from "@tanstack/react-router";
import { Plus, Sprout } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/StateViews";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/garden")({
  head: () => pageMeta("My Garden", "All of your plants in one calm, simple place."),
  component: GardenPage,
});

function GardenPage() {
  return (
    <>
      <PageHeader
        eyebrow="My Garden"
        title="Your plants"
        description="Every plant you care for, gathered in one place."
        actions={
          <Button disabled title="Adding plants arrives in the next step">
            <Plus aria-hidden />
            Add plant
          </Button>
        }
      />
      <EmptyState
        icon={Sprout}
        title="Your garden is waiting"
        description="Adding plants is coming next. Soon you'll see each plant, its photo and its care history here."
      />
    </>
  );
}
