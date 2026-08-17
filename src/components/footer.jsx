<<<<<<< HEAD
export default function Footer() {
	return (
		<footer>
			<div>
=======
import Logo from "./logo.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
	const linkClass = `mt-3 text-sm text-slate-500 hover:text-green-600`;

	return (
		<footer className="border-t bg-c-bg">
			<div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4">
				<div>
					<Logo />
					<p className="mt-4 text-sm leading-6 text-slate-500">
						Connect libraries, books and readers in one modern
						platform.
					</p>
				</div>
				<div className="grid ">
					<b>Discover</b>
					<Link to="/books" className={linkClass}>
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
					<b>Libraries</b>
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
					<b>Company</b>
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
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)
				<p>Copyright &copy; 2024 Library Management System</p>
			</div>
		</footer>
	);
}
