import { QueryClient } from "@tanstack/react-query";
import { createRouter, useRouter, type ErrorComponentProps } from "@tanstack/react-router";

import { ErrorState, LoadingState } from "@/components/common/StateViews";
import { routeTree } from "./routeTree.gen";

function DefaultRouteError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <ErrorState
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const getRouter = () => {
  // One client per request: a module-level QueryClient leaks cached data between SSR requests.
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Lets Query own freshness; set caching defaults on the QueryClient, not the router.
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent",
    // Page-level loading and error states, shown inside the app layout.
    defaultPendingComponent: () => <LoadingState />,
    defaultErrorComponent: DefaultRouteError,
  });

  return router;
};
