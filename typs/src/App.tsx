import { Routes, Route, Navigate } from "react-router-dom";

// components
import { Navbar } from "../src/components/navbar.tsx";
import { Footer } from "../src/components/footer.tsx";

// Pages
import { Home } from "./pages/home.tsx";
import { Books } from "./pages/books.tsx";
import { ForLibraries } from "./pages/forLibraries.tsx";
import { Libraries } from "./pages/libraries.tsx";

import { Login } from "./features/auth/pages/login.tsx";
import { Signup } from "./features/auth/pages/signup.tsx";



import { Reader, Owner, Placeholder } from "./pages/portal.tsx";

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/books" element={<Books />} />
				<Route path="/libraries" element={<Libraries />} />
				<Route path="/for-libraries" element={<ForLibraries />} />

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Signup />} />

				<Route path="/reader" element={<Reader />} />
				

				<Route
					path="/reader/borrowings"
					element={
						<Placeholder title="My Borrowings" role="reader" />
					}
				/>
				<Route
					path="/reader/libraries"
					element={<Placeholder title="My Libraries" role="reader" />}
				/>
				<Route
					path="/reader/profile"
					element={<Placeholder title="Profile" role="reader" />}
				/>
				<Route path="/owner" element={<Owner />} />
				<Route
					path="/owner/books"
					element={
						<Placeholder title="Library Catalog" role="owner" />
					}
				/>
				<Route
					path="/owner/members"
					element={
						<Placeholder title="Library Members" role="owner" />
					}
				/>
				<Route
					path="/owner/borrowings"
					element={<Placeholder title="Borrowings" role="owner" />}
				/>
				<Route
					path="/owner/analytics"
					element={<Placeholder title="Analytics" role="owner" />}
				/>
				<Route
					path="/owner/settings"
					element={
						<Placeholder title="Library Settings" role="owner" />
					}
				/>
				<Route
					path="/admin"
					element={<Navigate to="/admin-dashboard" replace />}
				/>
				<Route
					path="/admin-dashboard"
					element={
						<div className="grid min-h-screen place-items-center bg-slate-50">
							<div className="max-w-lg text-center">
								<h1 className="text-3xl font-black">
									Existing Admin Dashboard
								</h1>
								<p className="mt-3 text-slate-500">
									Mount the admin dashboard you already built
									here.
								</p>
							</div>
						</div>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} /> 
			</Routes>
			<Footer />
		</>
	);
}
