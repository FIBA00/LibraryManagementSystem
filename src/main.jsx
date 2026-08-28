import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

// lang
import "./i18n/index.js";

// internal imports
import App from "./App.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import { queryClient } from "./api/query.client.js";

// styles
import "./index.css"; //main

import "./refinements.css";
import "./forms.css";
import "./record-management.css";
import "./style-review.css";
import "./app-extensions.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
