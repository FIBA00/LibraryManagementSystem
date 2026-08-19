import { Routes, Route, useLocation } from "react-router-dom";
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

import ProtectedRoute from "./components/protectedRoute.jsx";
import UnauthorizedPage from "./pages/unauthorized.jsx";


// admin related
import AdminLayout from "./features/admin/layout/admin.layout.js";
import AdminManageLibraries from "./features/admin/pages/adminDashboard.jsx";


import AdminOverviewPage from "./features/admin/pages/adminOverview.jsx";
import AdminManageUsers  from "./features/admin/pages/adminUsers.jsx";
import AdminLibraryDetailsPage from "./features/admin/pages/adminLibraries.jsx";
import AdminSettingsPage from "./features/admin/pages/adminSettings.jsx";
import AdminReportsPage from "./features/admin/pages/adminReports.jsx";

export default function App() {
	const location = useLocation();
	const isProfileRoute = location.pathname.startsWith("/reader") || location.pathname.startsWith("/owner") || location.pathname.startsWith("/admin");

	return (
		<div>
			<Toaster position="top-center" />
			{!isProfileRoute &&
				<NavBar />

			}
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

				{/* Reader routes */}
				<Route element={<ProtectedRoute allowedRoles={[ "reader" ]} />}>
					<Route element={<ProfileLayout />}>
						<Route path="/reader" element={<ReaderProfilePage />} />
					</Route>
				</Route>


				{/* Owner routes */}
				<Route element={<ProtectedRoute allowedRoles={[ "owner" ]} />}>
					<Route element={<ProfileLayout />}>
						<Route
							path="/owner"
							element={<LibraryOwnerProfilePage />}
						/>
						<Route
							path="/dashboard"
							element={<LibraryOwnerDashboardPage />}
						/>
					</Route>
				</Route>

				{/* <Route element={<ProtectedRoute allowedRoles={[ "admin" ]} />}> */}
				<Route element={<AdminLayout />}>
					<Route path="/admin/overview" element={<AdminOverviewPage />} />
					<Route path="/admin/libraries" element={<AdminManageLibraries />} />
					<Route path="/admin/users" element={<AdminManageUsers />} />

					<Route path="/admin/libraries/:id" element={<AdminLibraryDetailsPage />} />
					<Route path="/admin/settings" element={<AdminSettingsPage />} />
					<Route path="/admin/reports" element={<AdminReportsPage />} />
					

				</Route>
				{/* </Route> */}


				<Route path="/unauthorized" element={<UnauthorizedPage />}></Route>

				{/* admin related */}


			</Routes>

			{!isProfileRoute &&
				<Footer />
			}
		</div>
	);
}
