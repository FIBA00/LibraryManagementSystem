// Components
import { Input } from "../components/input.tsx";
import { LibraryCard } from "../components/libraryCard.tsx";
import { libraries } from "../data/mock.ts";

export function Libraries() {
	return (
		<>
			<main className="min-h-screen bg-slate-50">
				<div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
					<p className="text-sm font-bold uppercase tracking-widest text-amber-600">
						Network
					</p>
					<h1 className="mt-2 text-4xl font-black">
						Libraries near you
					</h1>
					<div className="mt-8 max-w-xl">
						<Input placeholder="Search libraries or locations..." />
					</div>
					<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{libraries
							.filter((x) => x.status === "approved")
							.map((l) => (
								<LibraryCard key={l.id} l={l} />
							))}
					</div>
				</div>
			</main>
		</>
	);
}
