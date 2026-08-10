import { NavLink, useLocation } from "react-router-dom";
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
import { cn } from "../lib/utils";

export function Logo() {
	  const linkClass = ({ isActive }) =>
    `block py-2 ${isActive ? "text-amber-500" : "text-slate-300"}`;

	return (
		<div className="flex items-center gap-2.5 font-black tracking-tight">
			<span className="grid size-9 place-items-center rounded-xl bg-[#f59e0b]">
				<BookOpen size={20} />
			</span>
			<NavLink to="/" className={linkClass}> 
			<span className="text-xl">
				Book<span className="text-[#f59e0b]">Bridge</span>
			</span>

		</NavLink>
		</div>
	);
}
