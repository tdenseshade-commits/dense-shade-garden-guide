import { Logo } from "@/components/brand/Logo";

/** Shown while we check whether someone is signed in. */
export function FullScreenLoader({ label = "Loading DenseShade" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex animate-pulse flex-col items-center gap-4">
        <Logo size="lg" showWordmark={false} />
        <span className="text-sm text-muted-foreground">{label}…</span>
      </div>
    </div>
  );
}
