import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// lang
import "./i18n/index.js";

// internal imports
import App from "./App.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import "./index.css";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ThemeProvider>
				<App />

			</ThemeProvider>
		</BrowserRouter>
	</QueryClientProvider>,
);
