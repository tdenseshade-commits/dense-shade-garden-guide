import logoAsset from "@/assets/denseshade-logo.jpeg.asset.json";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  tone?: "default" | "inverse";
  className?: string;
}

const tileSize = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-20 w-20" } as const;
const wordSize = { sm: "text-lg", md: "text-xl", lg: "text-3xl" } as const;

/**
 * The approved DenseShade mark, shown exactly as supplied (never recoloured or stretched).
 * The image keeps its own background inside a rounded tile, like an app icon.
 */
export function Logo({ size = "md", showWordmark = true, tone = "default", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-2xl ring-1 ring-border",
          tileSize[size],
        )}
      >
        <img
          src={logoAsset.url}
          alt={showWordmark ? "" : "DenseShade"}
          aria-hidden={showWordmark || undefined}
          className="h-full w-full scale-[1.55] object-contain"
          width={80}
          height={80}
        />
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight",
            wordSize[size],
            tone === "inverse" ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          DenseShade
        </span>
      )}
    </span>
  );
}
