import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

// utils
import { Logo } from "../components/logo.tsx";

export function Navbar() {
	const linkClass = ({ isActive }) =>
		`block py-2 ${isActive ? "text-amber-500" : "text-slate-300"}`;

	return (
		<header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
			<div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 lg:px-8">
				<Logo />
				<nav className="hidden items-center gap-6 text-sm font-medium md:flex">
					<NavLink to="/Dashboard" className={linkClass}>
						Dashboard
					</NavLink>
					<NavLink to="/books" className={linkClass}>
						Books
					</NavLink>
					<NavLink to="/libraries" className={linkClass}>
						Find Libraries
					</NavLink>
					<NavLink to="/for-libraries" className={linkClass}>
						For Libraries
					</NavLink>
					<NavLink to="/about" className={linkClass}>
						About
					</NavLink>
					<NavLink to="/contact" className={linkClass}>
						Contact
					</NavLink>
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<NavLink
						to="/login"
						className="hidden px-3 py-2 text-sm font-semibold md:block">
						Sign in
					</NavLink>
					<NavLink to="/register">
						<span className="rounded-xl bg-[#17202a] px-4 py-2.5 text-sm font-semibold text-white">
							Get started
						</span>
					</NavLink>
					<Menu className="md:hidden" />
				</div>
			</div>
		</header>
	);
}
