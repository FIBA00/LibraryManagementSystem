// internal imports
import SearchSection from "../components/search.jsx";
import LibraryCard from "../features/libraries/components/librariesCard.jsx";

import { libraries } from "../data/mock_data.js";
export default function LibrariesPage() {
	return (
		<main className="min-h-screen">
			<div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
				<p className="test-sm font-bold uppercase tracking-widest text-text">
					Network
				</p>
				<h1 className="mt-2 text-4xl font-black">Libraries near you</h1>
					<SearchSection />

				<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{libraries.map((library) => (
						<LibraryCard key={library.id} library={library} />
					))}
				</div>
			</div>
		</main>
	);
}
