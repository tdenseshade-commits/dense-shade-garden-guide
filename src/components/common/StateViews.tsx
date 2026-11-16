import type { ReactNode } from "react";
import { CloudOff, Leaf, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon = Leaf, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border border-dashed bg-card/60 px-6 py-12 text-center",
        className,
      )}
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf/20 text-sage">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface LoadingStateProps {
  label?: string;
  rows?: number;
}

export function LoadingState({ label = "Loading", rows = 3 }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <span className="sr-only">{label}…</span>
      <Skeleton className="h-9 w-48 rounded-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-3xl border bg-card p-5">
          <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "This part of DenseShade didn't load. Please try again in a moment.",
  onRetry,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center rounded-3xl border bg-card px-6 py-12 text-center",
        className,
      )}
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight/15 text-cedar">
        <CloudOff className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {onRetry && <Button onClick={onRetry}>Try again</Button>}
        {action}
      </div>
    </div>
  );
}
