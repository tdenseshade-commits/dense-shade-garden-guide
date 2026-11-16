import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/common/ComingSoon";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/profile")({
  head: () => pageMeta("Profile", "Your DenseShade account and preferences."),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Your account"
        description="Sign in to keep your garden safe across devices."
      />
      <SectionCard
        title="Sign in"
        description="Accounts are being set up and will be switched on in the next step."
        action={<ComingSoon />}
        className="max-w-lg"
      >
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <fieldset disabled className="space-y-5">
            <FormField label="Email" hint="We'll only use this for your account.">
              <Input type="email" autoComplete="email" placeholder="you@example.com" />
            </FormField>
            <FormField label="Password">
              <Input type="password" autoComplete="current-password" placeholder="••••••••" />
            </FormField>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </fieldset>
        </form>
      </SectionCard>
    </>
  );
}
