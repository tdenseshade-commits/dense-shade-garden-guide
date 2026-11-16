import { Badge } from "@/components/ui/badge";

/** Clear label for anything that is not working yet, so nothing simulated looks real. */
export function ComingSoon({ label = "Coming soon" }: { label?: string }) {
  return <Badge variant="highlight">{label}</Badge>;
}
