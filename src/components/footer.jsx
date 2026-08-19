import Logo from "./logo.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
	const linkClass = `mt-3 text-sm text-text-muted hover:text-accent`;

	return (
		<footer className="border-t bg-surface">
			<div className="bottom-0 mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4">
				<div>
					<Logo />
					<p className="mt-4 text-sm leading-6 text-text-muted">
						Connect libraries, books and readers in one modern
						platform.
					</p>
				</div>
				<div className="grid ">
					<b className="text-text">Discover</b>
					<Link  to="/books" className={linkClass}>
						Find books
					</Link>
					<Link to="/libraries" className={linkClass}>
						Libraries
					</Link>
					<Link to="/collections" className={linkClass}>
						Collections
					</Link>
				</div>
				<div className="flex flex-col">
					<b className="text-text">Libraries</b>
					<Link to="/mylibrary" className={linkClass}>
						Manage a library
					</Link>
					<Link to="/pricing" className={linkClass}>
						Pricing
					</Link>
					<Link to="/resources" className={linkClass}>
						Resources
					</Link>
				</div>
				<div className="flex flex-col">
					<b className="text-text">Company</b>
					<Link to="/about" className={linkClass}>
						About
					</Link>
					<Link to="/contact" className={linkClass}>
						Contact
					</Link>
					<Link to="/privacy" className={linkClass}>
						Privacy
					</Link>
				</div>
				<p>Copyright &copy; 2024 Library Management System</p>
			</div>
		</footer>
	);
}
