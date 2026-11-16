import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

/** Main application layout: side rail on desktop, top bar + bottom tabs on mobile. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-background/90 pt-safe backdrop-blur md:hidden">
          <div className="flex h-16 items-center px-5">
            <Link to="/" aria-label="DenseShade home">
              <Logo size="sm" />
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-32 pt-6 md:px-10 md:pb-16 md:pt-12">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
