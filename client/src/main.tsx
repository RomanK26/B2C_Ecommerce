import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "@/app/App";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
    <Toaster position="bottom-right" reverseOrder={false} />
  </StrictMode>,
);
