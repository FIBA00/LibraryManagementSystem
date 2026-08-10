// utils
import { Logo } from "../components/logo.tsx";

export function Footer() {
	return (
		<footer className="border-t bg-white">
			<div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-4 lg:px-8">
				<div>
					<Logo />
					<p className="mt-4 text-sm leading-6 text-slate-500">
						Connect libraries, books and readers in one modern
						platform.
					</p>
				</div>
				<div>
					<b>Discover</b>
					<p className="mt-3 text-sm text-slate-500">
						Find books
						<br />
						Libraries
						<br />
						Collections
					</p>
				</div>
				<div>
					<b>Libraries</b>
					<p className="mt-3 text-sm text-slate-500">
						Manage a library
						<br />
						Pricing
						<br />
						Resources
					</p>
				</div>
				<div>
					<b>Company</b>
					<p className="mt-3 text-sm text-slate-500">
						About
						<br />
						Contact
						<br />
						Privacy
					</p>
				</div>
			</div>
		</footer>
	);
}
