<<<<<<< HEAD
import NavLink from "react-router-dom"

export default function NavBar() {
    const linkClass = ({isActive}) => `block py-2 ${isActive ? "text-amber-500": "text-slate-300"} ` 
    return (
        <header>
            <NavLink to="/" className={linkClass} >Home</NavLink>
        </header>
    )
}
=======
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const NavLinks = [
	{ key: "home", to: "/", label: "Home" },
	{ key: "books", to: "/books", label: "Books" },
	{ key: "libraries", to: "/libraries", label: "Find Libraries" },
	{ key: "owners", to: "/owners", label: "For Libraries" },
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
			className="text-xs font-semibold text-parchment border border-orange-edge rounded-full px-3 py-1.5 hover:bg-orange-pale hover:text-c-bg transition-colors"
			aria-label="Switch language">
			{i18n.language === "am" ? "EN" : "አማ"}
		</button>
	);
}

export default function NavBar() {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// active link uses the orange accent to match the theme
	const linkClass = ({ isActive }) =>
		`text-sm font-medium transition-colors ${
			isActive ? "text-c-orange" : "text-parchment/80 hover:text-c-orange"
		}`;

	// TODO: Implement is logged in check
	// eslint-disable-next-line
	const isLoggedIn = false;

	return (
		<header
			className={`fixed top-0 inset-x-0 z-50 px-2 gap-2 max-w-full bg-c-bg/9 backdrop-blur border-b border-c-red/25 transition-shadow duration-200 ${
				scrolled ? "shadow-card" : ""
			}`}>
			<div className="max-w-6xl mx-auto px-2">
				<div className="flex items-center justify-between h-16">
					{/* logo */}
					<Link to="/" className="flex items-center gap-2.5">
						<span className="grid size-9 place-items-center rounded-xl bg-c-orange">
							<BookOpen size={20} />
						</span>
						<span className="text-xl">
							Book <span className="text-c-orange">Bridge</span>
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
						<LanguageSwitcher />
						<NavLink to="/contact" className="btn-orange">
							{t("nav.cta")}
						</NavLink>
					</div>

					{/* mobile controls */}
					<div className="md:hidden flex items-center gap-3">
						<LanguageSwitcher />
						<button
							onClick={() => setMenuOpen((o) => !o)}
							className="flex flex-col gap-1.5 p-1"
							aria-label="Toggle menu"
							aria-expanded={menuOpen}>
							<span
								className={`block w-5 h-0.5 bg-parchment rounded transition-transform duration-200 ${
									menuOpen ? "rotate-45 translate-y-2" : ""
								}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-parchment rounded transition-opacity duration-200 ${
									menuOpen ? "opacity-0" : ""
								}`}
							/>
							<span
								className={`block w-5 h-0.5 bg-parchment rounded transition-transform duration-200 ${
									menuOpen ? "-rotate-45 -translate-y-2" : ""
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
						className="md:hidden border-t border-orange-edge/25 bg-c-card overflow-hidden">
						<div className="px-6 py-4 flex flex-col gap-4">
							{NavLinks.map(({ key, to, label }) => (
								<NavLink
									key={key}
									to={to}
									onClick={() => setMenuOpen(false)}
									className="text-base font-medium text-parchment/80 py-1">
									{t(`nav.${key}`, label)}
								</NavLink>
							))}
							<NavLink
								to="/contact"
								onClick={() => setMenuOpen(false)}
								className="btn-orange text-center text-sm mt-1">
								{t("nav.cta")}
							</NavLink>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)
