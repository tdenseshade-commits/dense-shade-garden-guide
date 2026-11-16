import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { FullScreenLoader } from "@/components/common/FullScreenLoader";
import { supabase } from "@/integrations/supabase/client";

// Everything in DenseShade requires an account (no guest mode). The session lives in
// browser storage, so this gate runs client-side only.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/auth" });
    return { user };
  },
  pendingComponent: () => <FullScreenLoader />,
  component: () => <Outlet />,
});
