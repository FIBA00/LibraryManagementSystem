import { Routes, Route } from "react-router-dom";

//------------ internal imports----------------
// Pages
import Home from "./pages/home.jsx";
import Books from "./pages/books.jsx";
import Libraries from "./pages/libraries.jsx";
import ForLibraries from "./pages/forLibraries.jsx";

// compoenents
import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import LoginPage from "./features/auth/pages/login.jsx";
import SignupPage from "./features/auth/pages/signup.jsx";
import AuthLayout from "./features/auth/pages/authLayout.jsx";

export default function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				{/* essential pages */}
				<Route path="/" element={<Home />} />
				<Route path="/books" element={<Books />} />
				<Route path="/libraries" element={<Libraries />} />
				<Route path="/for-libraries" element={<ForLibraries />} />

				{/* Auth pages */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<SignupPage />} />
				</Route>
				
			</Routes>
			<Footer />
		</div>
	);
}
