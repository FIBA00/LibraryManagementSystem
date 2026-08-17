import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// internal imports 
import Button from "../components/button.jsx";


export default function ForLibraries() {
	const libraryOwnersBenefits = [
		"Catalog management",
		"Memebers and staff",
		"circulation and analytics",
		"Rent and return check",
		"Financial analysis and management",
	];

	return (
		<>
			<section className="bg-c-bg text-ink">
				<div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
					<p className="font-bold uppercae tracking widest text-amber-400">
						For Library owners
					</p>
					<h1 className="mt-4 max-w-3xl text-5xl font-black">
						your library , finally in one place
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-ink">
						Manage books, members, staff and circulation while
						giving readers a modern way to discover your collection.
					</p>

					<Link to="/register" className="mt-8 inline-block">
						<Button>
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
					{libraryOwnersBenefits.map((x) => (
						<div className="rounded-2xl border p-7" key={x}>
							<h3 className="font-bold">{x}</h3>
							<p className="mt-2 text-sm leading-6 text-slate-500">
								A Focused workspace designed for real library
								operation
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
