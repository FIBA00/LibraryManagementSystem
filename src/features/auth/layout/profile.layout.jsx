import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";

// internal imports
import Logo from "../../../components/logo.jsx";
import { Book, HomeIcon, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NavLinks = [
	{ key: "home", to: "/", label: "Home" },
	{ key: "books", to: "/books", label: "Books" },
	{ key: "libraries", to: "/libraries", label: "Find Libraries" },
	{ key: "owners", to: "/owners", label: "For Libraries" },
	{ key: "about", to: "/about", label: "About" },
	{ key: "contactus", to: "/contactus", label: "Contact-us" },
];

export default function ProfileLayout() {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="min-h-screen">
			<aside
				className={`fixed top-15 mt-4 left-0 hidden w-64 border-r p-5 lg:block border-r-amber-300 border-2 ${scrolled ? "shadow-card" : ""}} `}>
				<Logo />
				<div className="m-4 p-4 space-y-2">
					<Link
						to="/home"
						className="bottom-5 left-5 flex items-center gap-3 ">
						<HomeIcon size={18} />
						home
					</Link>

					<Link
						to="/books"
						className="bottom-5 left-5 flex items-center gap-3 text-sm font-semibold text-slate-500">
						<Book size={18} />
						Books
					</Link>

					<Link
						to="/"
						className="bottom-5 left-5 flex items-center gap-3 text-sm font-semibold text-slate-500">
						<LogOut size={18} />
						Exit
					</Link>
				</div>

				<AnimatePresence>
					{sidebarOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="md:hidden border-t border-orange-edge/25 bg-c-card overflow-hidden">
							<div className="px-6 py-4 flex flex-col gap-4">
								{NavLinks.map(({ key, to, label }) => (
									<NavLink
										key={key}
										to={to}
										onClick={() => setSidebarOpen(false)}
										className="text-base font-medium text-parchment/80 py-1">
										{t(`nav.${key}`, label)}
									</NavLink>
								))}

								<NavLink
									to="/login"
									onClick={() => setSidebarOpen(false)}
									className="btn-orange text-center text-sm mt-1">
									{t("nav.login")}
								</NavLink>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</aside>

			<div className="lg:pl-64">
				<header className="flex h-15 p-4 items-center bg-c-bg/90 backdrop-blur transition-shadow duration-200 ">
					{/* mobile controls */}
					<div className="flex items-center gap-3">
						<button
							onClick={() => setSidebarOpen((o) => !o)}
							className="flex flex-col gap-1.5 p-1"
							aria-label="Toggle sidebar"
							aria-expanded={sidebarOpen}>
							<span
								className={`block w-5 h-0.5 bg-ink rounded transition-transform duration-200 ${
									sidebarOpen ? "rotate-45 translate-y-2" : ""
								}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-ink rounded transition-opacity duration-200 ${
									sidebarOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-ink rounded transition-transform duration-200 ${
									sidebarOpen
										? "-rotate-45 -translate-y-2"
										: ""
								}`}
							/>
						</button>
					</div>
				</header>
				<div className="p-5">
					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
