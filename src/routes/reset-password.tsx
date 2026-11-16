import { useEffect, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/forms/FormField";
import { FormMessage } from "@/components/forms/FormMessage";
import { LoadingState } from "@/components/common/StateViews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-errors";
import { PASSWORD_MIN_LENGTH, fieldErrors, resetPasswordSchema } from "@/lib/auth-schemas";
import { pageMeta } from "@/lib/seo";

/** A recovery session is only accepted shortly after a reset email was requested. */
const RECOVERY_WINDOW_MS = 60 * 60 * 1000;

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => pageMeta("Choose a new password", "Set a new password for your DenseShade account."),
  component: ResetPasswordPage,
});

type Status = "checking" | "ready" | "invalid";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>("checking");
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = (s: Status) => !cancelled && setStatus(s);

    async function check() {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.slice(1));
      if (hash.get("error_description") || url.searchParams.get("error_description")) return finish("invalid");

      const tokenHash = url.searchParams.get("token_hash");
      if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
        window.history.replaceState(null, "", url.pathname);
        return finish(error ? "invalid" : "ready");
      }

      // Links that carry tokens in the address are picked up by the sign-in client itself.
      const { data } = await supabase.auth.getSession();
      const sentAt = data.session?.user.recovery_sent_at;
      const recent = sentAt && Date.now() - new Date(sentAt).getTime() < RECOVERY_WINDOW_MS;
      finish(data.session && recent ? "ready" : "invalid");
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") finish("ready");
    });
    check();
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = resetPasswordSchema.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setBusy(false);
    if (error) return setFormError(friendlyAuthError(error));
    queryClient.clear();
    toast.success("Your password has been updated.");
    navigate({ to: "/", replace: true });
  }

  return (
    <AuthLayout title="Choose a new password" description="Pick something you haven't used here before.">
      {status === "checking" && <LoadingState label="Checking your reset link" rows={1} />}
      {status === "invalid" && (
        <div className="space-y-5">
          <FormMessage tone="error">
            This reset link has expired or was already used. Please request a new one.
          </FormMessage>
          <Button asChild size="lg" className="w-full">
            <Link to="/auth" search={{ mode: "forgot" }}>
              Request a new link
            </Link>
          </Button>
        </div>
      )}
      {status === "ready" && (
        <form noValidate onSubmit={submit} className="space-y-5">
          <FormField
            label="New password"
            hint={`At least ${PASSWORD_MIN_LENGTH} characters, with a letter and a number.`}
            error={errors["password"]}
          >
            <Input
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            />
          </FormField>
          <FormField label="Confirm new password" error={errors["confirmPassword"]}>
            <Input
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
            />
          </FormField>
          {formError && <FormMessage tone="error">{formError}</FormMessage>}
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy ? "Saving…" : "Save new password"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
