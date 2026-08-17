import { Link, useLocation } from "react-router-dom";

import {
	BookOpen,
	LayoutDashboard,
	LibraryBig,
	Users,
	BookMarked,
	Settings,
	LogOut,
	Search,
	Menu,
	BarChart3,
} from "lucide-react";
import type { ReactNode } from "react";

// utils
import { cn } from "../lib/utils.ts";
import { Logo } from "./logo.tsx";

const reader = [
	["Overview", "/reader", LayoutDashboard],
	["Find Books", "/books", Search],
	["My Borrowings", "/reader/borrowings", BookMarked],
	["My Libraries", "/reader/libraries", LibraryBig],
	["Profile", "/reader/profile", Users],
] as const;

const owner = [
	["Overview", "/owner", LayoutDashboard],
	["Books", "/owner/books", BookOpen],
	["Members", "/owner/members", Users],
	["Borrowings", "/owner/borrowings", BookMarked],
	["Analytics", "/owner/analytics", BarChart3],
	["Settings", "/owner/settings", Settings],
] as const;

export function PortalShell({
	children,
	role = "reader",
}: {
	children: ReactNode;
	role?: "reader" | "owner";
}) {
	const loc = useLocation(),
		items = role === "owner" ? owner : reader;
	return (
		<div className="min-h-screen bg-slate-50">
			<aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 lg:block">
				<Logo />
				<div className="mt-8 space-y-1">
					{items.map(([label, to, I]) => (
						<Link
							key={to}
							to={to}
							className={cn(
								"flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold",
								loc.pathname === to
									? "bg-[#17202a] text-white"
									: "text-slate-600 hover:bg-slate-100",
							)}>
							<I size={18} />
							{label}
						</Link>
					))}
				</div>
				<Link
					to="/"
					className="absolute bottom-5 left-5 flex items-center gap-3 text-sm font-semibold text-slate-500">
					<LogOut size={18} />
					Exit
				</Link>
			</aside>
			<div className="lg:pl-64">
				<header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white/90 px-5 backdrop-blur">
					<Menu className="lg:hidden" />
					<div className="ml-auto grid size-9 place-items-center rounded-full bg-amber-100 font-bold">
						F
					</div>
				</header>
				<main className="p-5 lg:p-8">{children}</main>
			</div>
		</div>
	);
}
