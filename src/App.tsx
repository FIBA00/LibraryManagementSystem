import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { Overview } from "./pages/Overview";
import { Libraries } from "./pages/Libraries";
import { LibraryDetail } from "./pages/LibraryDetail";
import { Placeholder } from "./pages/Placeholder";
import { Layout } from "../../components/Layout";
import { Registrations } from "./pages/Registrations";
import { Generic } from "./pages/Generic";
export default function App() {
	return (
		<BrowserRouter>
			<AdminLayout>
				<Routes>
					<Route path="/" element={<Overview />} />
					<Route path="/registrations" element={<Registrations />} />
					<Route
						path="/libraries"
						element={<Generic type="libraries" />}
					/>
					<Route path="/users" element={<Generic type="users" />} />
					<Route path="/books" element={<Generic type="books" />} />
					<Route
						path="/borrowing"
						element={<Generic type="borrowing" />}
					/>
					<Route
						path="/reports"
						element={<Generic type="reports" />}
					/>
					<Route
						path="/settings"
						element={<Generic type="settings" />}
					/>
					<Route path="/admin" element={<Overview />} />
					<Route path="/admin/libraries" element={<Libraries />} />
					<Route
						path="/admin/libraries/:id"
						element={<LibraryDetail />}
					/>
					<Route
						path="/admin/books"
						element={<Placeholder title="Books & catalog" />}
					/>
					<Route
						path="/admin/borrowings"
						element={<Placeholder title="Borrowings" />}
					/>
					<Route
						path="/admin/members"
						element={<Placeholder title="Members" />}
					/>
					<Route
						path="/admin/reports"
						element={<Placeholder title="Reports" />}
					/>
					<Route
						path="/admin/settings"
						element={<Placeholder title="Settings" />}
					/>
					<Route
						path="*"
						element={<Navigate to="/admin" replace />}
					/>
				</Routes>
			</AdminLayout>
		</BrowserRouter>
	);
}
