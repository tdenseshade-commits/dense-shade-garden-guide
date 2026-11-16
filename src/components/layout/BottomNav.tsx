import { NAV_ITEMS } from "@/lib/navigation";
import { NavLinkItem } from "./NavLinkItem";

/** Mobile tab bar, fixed to the bottom and safe-area aware for future app packaging. */
export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-safe backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {NAV_ITEMS.map((item) => (
          <NavLinkItem key={item.to} item={item} variant="tab" />
        ))}
      </div>
    </nav>
  );
}
