import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//------------ internal imports----------------
// Pages
import Home from "./pages/home.jsx";
import Books from "./pages/books.jsx";
import Libraries from "./pages/libraries.jsx";
import ForLibraries from "./pages/forLibraries.jsx";

// components
import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

// features
import LoginPage from "./features/auth/pages/login.jsx";
import SignupPage from "./features/auth/pages/signup.jsx";
import AuthLayout from "./features/auth/layout/auth.layout.jsx";
import ProfileLayout from "./features/auth/layout/profile.layout.jsx";
import ReaderProfilePage from "./features/auth/pages/reader.jsx";
import LibraryOwnerProfilePage from "./features/auth/pages/owner.jsx";
import LibraryOwnerDashboardPage from "./features/libraries/pages/ownerDashboard.jsx";
import { AdminLayout } from "./features/admin/layout/admin.layout.js";
import AdminDashboardPage from "./features/admin/pages/adminDashboard.jsx";

export default function App() {
	return (
		<div>
			<Toaster position="top-center" />
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

				{/* Profile pages */}
				<Route element={<ProfileLayout />}>
					<Route path="/reader" element={<ReaderProfilePage />} />
					<Route
						path="/owner"
						element={<LibraryOwnerProfilePage />}
					/>
				</Route>

				{/* dashboards */}
				<Route
					path="/dashboard"
					element={<LibraryOwnerDashboardPage />}
				/>

				{/* admin related */}
				<Route element={<AdminLayout />}>
					<Route path="/admin" element={<AdminDashboardPage />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	);
}
