import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";
import { NAV_ITEMS } from "@/lib/navigation";
import { NavLinkItem } from "./NavLinkItem";

/** Desktop navigation rail. */
export function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar px-4 py-6 text-sidebar-foreground md:flex lg:w-72">
      <Link to="/" className="mb-10 px-2" aria-label="DenseShade home">
        <Logo tone="inverse" />
      </Link>
      <nav aria-label="Main" className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLinkItem key={item.to} item={item} variant="side" />
        ))}
      </nav>
      <p className="mt-auto px-2 font-display text-sm leading-relaxed text-sidebar-foreground/70">
        Peace in your garden.
        <br />
        Ease in your day.
      </p>
    </aside>
  );
}
