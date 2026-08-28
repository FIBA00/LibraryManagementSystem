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
import "./styles/index.css"; 
import "./styles/index_main.css"; //main
import "./styles/refinements.css";
import "./styles/forms.css";
import "./styles/record-management.css";
import "./styles/style-review.css";
import "./styles/app-extensions.css";

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
