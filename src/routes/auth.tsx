import { useState, type FormEvent } from "react";
import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/forms/FormField";
import { FormMessage } from "@/components/forms/FormMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-errors";
import {
  PASSWORD_MIN_LENGTH,
  fieldErrors,
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/auth-schemas";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup" | "forgot";
const MODES: AuthMode[] = ["signin", "signup", "forgot"];

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { mode?: AuthMode | undefined } => ({
    mode: MODES.includes(search["mode"] as AuthMode) ? (search["mode"] as AuthMode) : undefined,
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/" });
  },
  head: () => pageMeta("Sign in", "Sign in or create your DenseShade account."),
  component: AuthPage,
});

const COPY: Record<AuthMode, { title: string; description: string }> = {
  signin: { title: "Welcome back", description: "Sign in to see what your garden needs today." },
  signup: { title: "Create your account", description: "Start caring for your plants with less effort." },
  forgot: { title: "Reset your password", description: "We'll email you a link to choose a new one." },
};

function AuthPage() {
  const { mode = "signin" } = Route.useSearch();
  return (
    <AuthLayout title={COPY[mode].title} description={COPY[mode].description}>
      {mode !== "forgot" && <ModeTabs mode={mode} />}
      {mode === "signin" && <SignInForm />}
      {mode === "signup" && <SignUpForm />}
      {mode === "forgot" && <ForgotForm />}
    </AuthLayout>
  );
}

function ModeTabs({ mode }: { mode: AuthMode }) {
  const tab = (m: AuthMode, label: string) => (
    <Link
      to="/auth"
      search={{ mode: m }}
      replace
      aria-current={mode === m ? "page" : undefined}
      className={cn(
        "flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors",
        mode === m ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
  return (
    <nav aria-label="Account" className="mb-6 flex gap-1 rounded-full bg-muted p-1">
      {tab("signin", "Sign in")}
      {tab("signup", "Create account")}
    </nav>
  );
}

function useFormState() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return { errors, setErrors, formError, setFormError, busy, setBusy };
}

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needsConfirm, setNeedsConfirm] = useState(false);
  const [resent, setResent] = useState(false);
  const { errors, setErrors, formError, setFormError, busy, setBusy } = useFormState();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setNeedsConfirm(false);
    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) {
      setFormError(friendlyAuthError(error));
      setNeedsConfirm(error.code === "email_not_confirmed");
      return;
    }
    navigate({ to: "/", replace: true });
  }

  async function resend() {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) setFormError(friendlyAuthError(error));
    else setResent(true);
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <FormField label="Email" error={errors["email"]}>
        <Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <FormField label="Password" error={errors["password"]}>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <div className="-mt-2 text-right">
        <Link to="/auth" search={{ mode: "forgot" }} className="text-sm font-medium text-sage hover:underline">
          Forgot password?
        </Link>
      </div>
      {formError && (
        <FormMessage tone="error">
          {formError}
          {needsConfirm && !resent && (
            <Button type="button" variant="link" className="h-auto p-0 pl-1 text-sm" onClick={resend}>
              Resend confirmation email
            </Button>
          )}
        </FormMessage>
      )}
      {resent && <FormMessage tone="success">We've sent a new confirmation link to {email.trim()}.</FormMessage>}
      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "", confirmPassword: "" });
  const [sentTo, setSentTo] = useState<string | null>(null);
  const { errors, setErrors, formError, setFormError, busy, setBusy } = useFormState();
  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = signUpSchema.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) return setFormError(friendlyAuthError(error));
    if (data.session) {
      navigate({ to: "/onboarding", replace: true });
      return;
    }
    setSentTo(parsed.data.email);
  }

  if (sentTo) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center shadow-soft">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf/20 text-sage">
          <MailCheck className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We've sent a confirmation link to <strong className="text-foreground">{sentTo}</strong>. Open it to
          finish creating your account, then sign in.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/auth" search={{ mode: "signin" }}>
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <FormField label="Email" error={errors["email"]}>
        <Input type="email" autoComplete="email" value={values.email} onChange={set("email")} />
      </FormField>
      <FormField
        label="Password"
        hint={`At least ${PASSWORD_MIN_LENGTH} characters, with a letter and a number.`}
        error={errors["password"]}
      >
        <Input type="password" autoComplete="new-password" value={values.password} onChange={set("password")} />
      </FormField>
      <FormField label="Confirm password" error={errors["confirmPassword"]}>
        <Input
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={set("confirmPassword")}
        />
      </FormField>
      {formError && <FormMessage tone="error">{formError}</FormMessage>}
      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}

function ForgotForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { errors, setErrors, formError, setFormError, busy, setBusy } = useFormState();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return setFormError(friendlyAuthError(error));
    setSent(true);
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      {sent ? (
        <FormMessage tone="success">
          If an account exists for {email.trim()}, a reset link is on its way. Check your inbox.
        </FormMessage>
      ) : (
        <>
          <FormField label="Email" error={errors["email"]}>
            <Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          {formError && <FormMessage tone="error">{formError}</FormMessage>}
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy ? "Sending…" : "Send reset link"}
          </Button>
        </>
      )}
      <p className="text-center text-sm">
        <Link to="/auth" search={{ mode: "signin" }} className="font-medium text-sage hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
