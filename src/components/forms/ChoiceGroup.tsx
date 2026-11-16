import { useId } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface Choice<T extends string> {
  value: T;
  label: string;
  hint?: string | undefined;
}

interface ChoiceGroupProps<T extends string> {
  legend: string;
  name: string;
  options: readonly Choice<T>[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string | undefined;
}

/** Large tappable radio cards for a single choice. */
export function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: ChoiceGroupProps<T>) {
  const errorId = useId();
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="space-y-2">
      <legend className="mb-2 text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "relative flex cursor-pointer flex-col rounded-2xl border bg-card px-4 py-3 transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                selected ? "border-sage bg-leaf/15" : "hover:bg-accent",
                error && !value && "border-destructive",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                {opt.label}
                {selected && <Check className="h-4 w-4 shrink-0 text-sage" aria-hidden />}
              </span>
              {opt.hint && <span className="mt-0.5 text-xs text-muted-foreground">{opt.hint}</span>}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}
