import { CalendarHeart, Compass, Droplets, Sprout, UserRound, type LucideIcon } from "lucide-react";

export type NavPath = "/" | "/garden" | "/discover" | "/care" | "/profile";

export interface NavItem {
  label: string;
  to: NavPath;
  icon: LucideIcon;
  description: string;
}

/** The app's five main destinations, in display order. Scan and AI help are contextual actions, not tabs. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Today", to: "/", icon: CalendarHeart, description: "What your garden needs today" },
  { label: "My Garden", to: "/garden", icon: Sprout, description: "Your plants, all in one place" },
  { label: "Discover", to: "/discover", icon: Compass, description: "Explore plants to grow" },
  { label: "Care", to: "/care", icon: Droplets, description: "Tasks, reminders and care notes" },
  { label: "Profile", to: "/profile", icon: UserRound, description: "Your account and preferences" },
] as const;
