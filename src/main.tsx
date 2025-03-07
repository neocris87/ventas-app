import "@/styles/globals.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/react";
import Custom404 from "./components/404";

// Create a new QueryClient
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient :  undefined!,
  },
  scrollRestoration: true,
  defaultErrorComponent : () => <Custom404 />,
  defaultNotFoundComponent : () => <Custom404 />,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider placement="top-center"  />
          <RouterProvider router={router} context={{queryClient : queryClient}} />
        </HeroUIProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
