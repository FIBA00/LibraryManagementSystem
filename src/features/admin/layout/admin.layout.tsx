import { NavLink, Outlet } from "react-router-dom";
import {
	Bell,
	BookOpen,
	Building2,
	ChevronDown,
	ClipboardList,
	FileBarChart,
	LayoutDashboard,
	Menu,
	Settings,
	ShieldCheck,
	User,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";

// internal imports
import ThemeToggle from "../../../components/theme.jsx";
import { cn } from "../../../lib/utils.js";
import { useCurrentUser } from "../../auth/hooks/useAuth.js";

const sections = [
	{
		label: "Workspace",
		items: [
			[ "/admin/overview", "Overview", LayoutDashboard ],
			[ "/admin/libraries", "Libraries", Building2 ],
			[ "/admin/users", "Users", Users ],
		],
	},
	{
		label: "Circulation",
		items: [
			[ "/admin/books", "Books & catalog", BookOpen ],
			[ "/admin/borrowings", "Borrowings", ClipboardList ],
			[ "/admin/libraries/members", "Members", Users ],
		],
	},
	{ label: "Insights", items: [ [ "/admin/reports", "Reports", FileBarChart ] ] },
	{ label: "System", items: [ [ "/admin/settings", "Settings", Settings ] ] },
];

const NavLinks = [
	{ key: "home", to: "/", label: "Home" },
	{ key: "books", to: "/books", label: "Books" },
	{ key: "libraries", to: "/libraries", label: "Find Libraries" },
];

function getInitials(username) {
	if (!username) return "..";
	return username.slice(0, 2).toUpperCase();
}

export default function AdminLayout() {
	const [ sideBarOpen, setSideBarOpen ] = useState(false);
	const [ dropDownMenu, setDropDownMenu ] = useState(false);

	const { data, isLoading } = useCurrentUser();
	const user = data?.data;
	const initials = getInitials(user?.username);

	const linkClass = ({ isActive }) =>
		`text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-text/80 hover:text-c-orange"
		}`;

	return (
		<div className="mx-auto min-h-screen  hex-bg">
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-surface border-r border-slate-600 transition-transform lg:translate-x-0",
					sideBarOpen ? "translate-x-0" : "-translate-x-full",
				)}>
				<div className="flex h-18 items-center justify-between border-b border-slate-600 px-6">
					<div className="flex items-center gap-3">
						<div className="grid size-9 place-items-center rounded-xl">
							<BookOpen size={19} />
						</div>
						<div>
							<div className="font-extrabold tracking-tight">
								{/* TODO: pass library name from data here */}
								Platform Admin
							</div>
							<div className="text-[10px] font-semibold uppercase tracking-tighter text-text-muted">
								Administration
							</div>
						</div>
					</div>

					<button
						className="lg:hidden"
						onClick={() => setSideBarOpen(false)}>
						<X size={20} />
					</button>
				</div>

				<nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
					{sections.map(function handleSections({ label, items }) {
						return (
							<div key={label}>
								<div className="px-3 pb-2 text-sm font-bold uppercase tracking-tight">
									{label}
								</div>
								<div>
									{items.map(function handleItems([ to, name, Icon ]) {
										return (
											<NavLink
												key={to}
												to={to}
												end={to === "/admin"}
												onClick={() => setSideBarOpen(false)}
												className={({ isActive }) =>
													cn(
														"mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
														isActive
															? "bg-surface-raised text-text shadow-sm shadow-accent-alt"
															: "text-text-muted hover:bg-accent hover:text-surface-hover",
													)
												}>
												<Icon size={18} />
												{name}
											</NavLink>
										);
									})}
								</div>
							</div>
						);
					})}
				</nav>

				<div className="relative m-4 rounded-2xl border-2 border-border-strong p-4">
					<div className="mb-3 flex items-center gap-2 text-xs font-bold text-text">
						<ShieldCheck size={15} /> Platform Admin
					</div>
					<div className="flex items-center gap-3">
						<div className="grid size-9 place-items-center rounded-full bg-success text-xs font-bold">
							{initials}
						</div>
						<div className="min-w-0">
							<div className="truncate text-sm font-semibold">
								{isLoading ? "Loading..." : user?.username}
							</div>
							<div className="truncate text-xs text-text-muted capitalize">
								{isLoading ? "" : user?.role}
							</div>
						</div>
						<ChevronDown
							className="ml-auto cursor-pointer text-text-muted"
							size={15}
							onClick={() => setDropDownMenu((prev) => !prev)}
						/>
					</div>

					{dropDownMenu && user && (
						<div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-border-strong bg-surface p-4 shadow-lg">
							<div className="mb-2 flex items-center gap-2 text-xs font-bold text-text">
								<User size={14} /> Account
							</div>
							<dl className="space-y-1 text-xs text-text-muted">
								<div className="flex justify-between gap-2">
									<dt>Username</dt>
									<dd className="truncate text-text">{user.username}</dd>
								</div>
								<div className="flex justify-between gap-2">
									<dt>Email</dt>
									<dd className="truncate text-text">{user.email}</dd>
								</div>
								<div className="flex justify-between gap-2">
									<dt>Phone</dt>
									<dd className="truncate text-text">{user.phone}</dd>
								</div>
								<div className="flex justify-between gap-2">
									<dt>Role</dt>
									<dd className="truncate text-text capitalize">{user.role}</dd>
								</div>
							</dl>
						</div>
					)}
				</div>
			</aside>

			{sideBarOpen && (
				<div
					className="sticky inset-0 z-30 bg-surface lg:hidden "
					onClick={() => setSideBarOpen(false)}
				/>
			)}
			<div className="lg:pl-72">
				<header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-border-strong bg-surface/90 px-4 backdrop-blur-2xl lg:px-8">
					<button
						className="rounded p-2 hover:bg-surfce lg:hidden"
						onClick={() => setSideBarOpen(true)}>
						<Menu />
					</button>

					<nav className="flex items-center justify-center px-4 gap-4">
						{NavLinks.map(({ key, to, label }) => (
							<NavLink key={key} to={to} className={linkClass}>
								 {label}
							</NavLink>
						))}
					</nav>

					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<button className="relative rounded-xl p-2.5 text-text-muted hover:bg-surface-hover">
							<Bell size={19} />
							<span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
						</button>
						<div className="ml-2 hidden h-7 w-px bg-surface sm:block" />

						<div className="ml-2 grid size-9 place-items-center rounded-full text-xs font-bold ">
							{initials}
						</div>
					</div>
				</header>
			</div>

			<div className="p-4 sm:p-6 lg:p-8">
				<main>
					<Outlet context={{ user }} />
				</main>
			</div>
		</div>
	);
}