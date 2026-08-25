import {
	Bell,
	BookOpen,
	Building2,
	ClipboardList,
	FileBarChart,
	LayoutDashboard,
	Menu,
	Settings,
	Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

// internal imports

import ThemeToggle from "../../../components/theme.jsx";
import { useCurrentUser } from "../../auth/hooks/useAuth.js";
import { getInitials } from "../../../lib/utils.js";
import Sidebar from "../../../components/sidebar.jsx";

const NavLinks = [
	{ key: "home", to: "/", label: "Home" },
	{ key: "books", to: "/books", label: "Books" },
	{ key: "libraries", to: "/libraries", label: "Find Libraries" },
];

const sections = [
	{
		label: "Workspace",
		items: [
			["/admin/overview", "Overview", LayoutDashboard],
			["/admin/libraries", "Libraries", Building2],
			["/admin/users", "Users", Users],
		],
	},
	{
		label: "Circulation",
		items: [
			["/admin/books", "Books & catalog", BookOpen],
			["/admin/borrowings", "Borrowings", ClipboardList],
			["/admin/libraries/members", "Members", Users],
		],
	},
	{ label: "Insights", items: [["/admin/reports", "Reports", FileBarChart]] },
	{ label: "System", items: [["/admin/settings", "Settings", Settings]] },
];

export default function OwnerLayout() {
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const linkClass = ({ isActive }) =>
		`text-sm font-medium transition-colors ${
			isActive ? "text-accent" : "text-text/80 hover:text-c-orange"
		}`;
	const { data, isLoading } = useCurrentUser();
	const user = data?.data;
	const initials = getInitials(user?.username);
	return (
		<div className="mx-auto min-h-screen hex-bg">
			{/* TODO: insert sidebar here */}
			<Sidebar
				sideBarOpen={sideBarOpen}
				setSideBarOpen={setSideBarOpen}
				sections={sections}
				initials={initials}
				isLoading={isLoading}
				user={user}
			/>
			<div className="lg:pl-72">
				<header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-border-string bg-surface/90 px-4 backdrop-blur-2xl lg:px-8">
					<button
						className="rounded p-2 hover:bg-surface lg:hidden"
						onClick={() => setSideBarOpen(true)}>
						<Menu />
					</button>

					{/* navigation links */}
					<nav className="flex items-center justify-center px-4 gap-4">
						{NavLinks.map(function handleNavLinks({
							key,
							to,
							label,
						}) {
							return (
								<NavLink
									key={key}
									to={to}
									className={linkClass}>
									{" "}
									{label}
								</NavLink>
							);
						})}
					</nav>

					{/* extra toggles */}
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<button className="relative rounded-xl p-2.5 text-text-muted hover:bg-surface-hover">
							<Bell size={19} />
							<span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
						</button>
						<div className="ml-2 hidden h-7 w-px bg-surface sm:block" />
						<div className="ml-2 grid size-9 place-items-center rounded-full text-xs font-bold">
							{initials}
						</div>
					</div>
				</header>
			</div>

			{/* insert */}
			<div className="p-4 sm:p-6 lg:p-8">
				<main>
					<Outlet context={{ user }} />
				</main>
			</div>
		</div>
	);
}
