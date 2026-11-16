import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Calm, centred frame for sign-in, registration, password and onboarding screens. */
export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="bg-canopy hidden w-[42%] max-w-xl flex-col justify-between p-10 text-primary-foreground lg:flex">
        <Logo tone="inverse" />
        <div>
          <p className="font-display text-4xl font-semibold leading-tight">
            Peace in your garden.
            <br />
            Ease in your day.
          </p>
          <p className="mt-4 max-w-sm text-base opacity-80">
            Less time managing. More time growing, nurturing and enjoying.
          </p>
        </div>
      </aside>
      <main className="flex flex-1 items-start justify-center px-5 pb-16 pt-safe sm:items-center">
        <div className="w-full max-w-md pt-10 sm:pt-0">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
          {description && (
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
