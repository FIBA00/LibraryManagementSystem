import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

// utils
import { Logo } from "../components/logo.tsx";

export function Navbar() {
	return (
		<header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
			<div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 lg:px-8">
				<Logo />
				<nav className="hidden items-center gap-6 text-sm font-medium md:flex">
					<Link to="/books">Find Books</Link>
					<Link to="/libraries">Libraries</Link>
					<Link to="/for-libraries">For Libraries</Link>
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<Link
						to="/login"
						className="hidden px-3 py-2 text-sm font-semibold md:block">
						Sign in
					</Link>
					<Link to="/register">
						<span className="rounded-xl bg-[#17202a] px-4 py-2.5 text-sm font-semibold text-white">
							Get started
						</span>
					</Link>
					<Menu className="md:hidden" />
				</div>
			</div>
		</header>
	);
}
