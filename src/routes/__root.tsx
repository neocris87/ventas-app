import DefaultLayout from "@/layouts/default";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </>
  ),
});
