import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

// internal imports
import { useCurrentUser } from "../features/auth/hooks/useAuth.js";
import ThemeToggle from "./theme.jsx";

const dashboardPathByRole = {
	admin: "/admin",
	owner: "/owner",
	reader: "/reader",
};

const NavLinks = [
	{ key: "home", to: "/", label: "Home" },
	{ key: "books", to: "/books", label: "Books" },
	{ key: "libraries", to: "/libraries", label: "Find Libraries" },
	{ key: "owners", to: "/owner", label: "For Libraries" },
	{ key: "about", to: "/about", label: "About" },
	{ key: "contactus", to: "/contactus", label: "Contact-us" },
];

function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const toggle = () =>
		i18n.changeLanguage(i18n.language === "am" ? "en" : "am");

	return (
		<button
			onClick={toggle}
			className="text-xs font-semibold text-text border border-border rounded-full px-3 py-1.5 hover:bg-accent hover:text-text transition-colors delay-150 duration-200 ease-in-out cursor-pointer"
			aria-label="Switch language">
			{i18n.language === "am" ? "EN" : "አማ"}
		</button>
	);
}

export default function NavBar() {
	const { t } = useTranslation();
	const [ scrolled, setScrolled ] = useState(false);
	const [ menuOpen, setMenuOpen ] = useState(false);
	const { data: response, isLoading } = useCurrentUser();
	const user = response?.data;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// active link uses the orange accent to match the theme
	const linkClass = ({ isActive }) =>
		`text-sm font-medium transition-colors ${isActive ? "text-success" : "text-text/80 hover:text-c-orange"
		}`;

	// TODO: Implement is logged in check
	 
	const dashboardPath = user ? (dashboardPathByRole[ user.role ] ?? "/reader") : "/login";
	const dashboardLabel = isLoading ? "..." : user ? user.username : t("nav.login");

	return (
		<header
			className={`sticky top-0 inset-x-0 z-40 px-2 h-15 gap-2 max-w-full  bg-surface-raised/90 backdrop-blur border-b border-border-strong transition-shadow duration-200 ${scrolled ? "shadow-card" : ""
				}`}>
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex items-center justify-between h-16">
					{/* logo */}
					<Link to="/" className="flex items-center gap-2.5">
						<span className="grid size-9 place-items-center rounded-xl bg-surface">
							<BookOpen size={20} />
						</span>
						<span className="text-xl">
							Book <span className="text-accent">Bridge</span>
						</span>
					</Link>

					{/* desktop nav links */}
					<nav className="hidden md:flex items-center gap-4">
						{NavLinks.map(({ key, to, label }) => (
							<NavLink key={key} to={to} className={linkClass}>
								{t(`nav.${key}`, label)}
							</NavLink>
						))}
					</nav>

					{/* desktop right side */}
					<div className="hidden md:flex items-center gap-3">
						<LanguageSwitcher  />
						<ThemeToggle />

						{/* getting started */}
						<NavLink to={dashboardPath} className="btn-orange">
							{dashboardLabel}
						</NavLink>
					</div>

					{/* mobile controls */}
					<div className="md:hidden flex items-center gap-3">
						<LanguageSwitcher />
						<ThemeToggle />


						<button
							onClick={() => setMenuOpen((o) => !o)}
							className="flex flex-col gap-1.5 p-1"
							aria-label="Toggle menu"
							aria-expanded={menuOpen}>
							<span
								className={`block w-5 h-0.5 bg-c-bg  rounded  transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""
									}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-c-bg rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""
									}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-c-bg rounded transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
									}`}
							/>
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="md:hidden cyber-card border-t border-border/25 bg-surface overflow-hidden">


						<div className="px-4 py-4 flex flex-col gap-4">
							{NavLinks.map(({ key, to, label }) => (
								<NavLink
									key={key}
									to={to}
									onClick={() => setMenuOpen(false)}
									className="text-base font-medium text-text px-2 hover:bg-accent rounded-2xl transition-colors ease-in-out">
									{t(`nav.${key}`, label)}
								</NavLink>
							))}



							<NavLink to={dashboardPath} className="btn-orange text-center text-sm mt-1" onClick={() => setMenuOpen(false)}>
								{dashboardLabel}
							</NavLink>
						</div>


					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
