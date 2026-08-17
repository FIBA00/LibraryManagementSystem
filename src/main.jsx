<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// internal imports
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// lang
import "./i18n/index.js";

// internal imports
import App from "./App.jsx";
import "./index.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</QueryClientProvider>,
);
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)
