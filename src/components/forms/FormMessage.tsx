import type { ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormMessageProps {
  tone: "error" | "success";
  children: ReactNode;
  className?: string;
}

/** Form-level message: an error the person can act on, or a calm confirmation. */
export function FormMessage({ tone, children, className }: FormMessageProps) {
  const Icon = tone === "error" ? CircleAlert : CircleCheck;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl px-4 py-3 text-sm leading-relaxed",
        tone === "error" ? "bg-highlight/15 text-cedar" : "bg-leaf/20 text-pine",
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
