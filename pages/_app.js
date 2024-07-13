import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "./error";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
