import { Link } from "@tanstack/react-router";

import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavLinkItemProps {
  item: NavItem;
  variant: "tab" | "side";
}

/** One navigation destination, shared by the mobile tab bar and the desktop side rail. */
export function NavLinkItem({ item, variant }: NavLinkItemProps) {
  const Icon = item.icon;

  if (variant === "tab") {
    return (
      <Link
        to={item.to}
        activeOptions={{ exact: true }}
        className="group flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-semibold text-muted-foreground transition-colors data-[status=active]:text-primary"
      >
        <span className="flex h-8 w-14 items-center justify-center rounded-full transition-colors group-data-[status=active]:bg-leaf/25">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={item.to}
      activeOptions={{ exact: true }}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-sidebar-foreground/75 transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
