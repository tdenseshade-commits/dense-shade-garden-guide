import { cloneElement, isValidElement, useId, type ReactElement } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  className?: string | undefined;
  /** A single input-like control (Input, Textarea, Select trigger…). It receives id and aria props. */
  children: ReactElement<Record<string, unknown>>;
}

/** Label + control + hint/error, wired together for screen readers. */
export function FormField({ label, hint, error, className, children }: FormFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>
      {control}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
