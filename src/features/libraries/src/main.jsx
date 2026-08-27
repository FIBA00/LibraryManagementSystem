// Scholar's Ledger entry point: JSX-only React mount.
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import "./refinements.css";
import "./forms.css";
import "./record-management.css";
import "./style-review.css";
import "./app-extensions.css";
import { queryClient } from "../lib/queryClient";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
