import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "../components/button";

export function ForLibraries() {
	return (
		<>
			<section className="bg-[#17202a] text-white">
				<div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
					<p className="font-bold uppercase tracking-widest text-amber-400">
						For libraries
					</p>
					<h1 className="mt-4 max-w-3xl text-5xl font-black">
						Your library, finally in one place.
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
						Manage books, members, staff and circulation while
						giving readers a modern way to discover your collection.
					</p>
					<Link to="/register" className="mt-8 inline-block">
						<Button variant="secondary">
							Register your library <ArrowRight size={17} />
						</Button>
					</Link>
				</div>
			</section>
			<section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
				<h2 className="text-3xl font-black">
					Everything your team needs
				</h2>
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{[
						"Catalog management",
						"Members and staff",
						"Circulation and analytics",
					].map((x) => (
						<div className="rounded-2xl border p-7" key={x}>
							<h3 className="font-bold">{x}</h3>
							<p className="mt-2 text-sm leading-6 text-slate-500">
								A focused workspace designed for real library
								operations.
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
