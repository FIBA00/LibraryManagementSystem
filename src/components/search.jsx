import { useState } from "react";
import { Search } from "lucide-react";


export default function SearchSection() {
	// real working search input
	const [ searchTerm, setSearchTerm ] = useState("");
	function handleSearch(e) {
		e.preventDefault()
	}
	return (
		<section className="w-full px-2 py-4 md:px-4">
			<div className="mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-accent backdrop-blur-sm">
				<div className="flex justify-between gap-4 border-b border-r-border-strong/10 bg-linear-to-r from-accent via-danger to-amber-500/80 p-4 md:flex-row md:items-center md:p-6">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-text shadow-inner shadow-white/10">
						<Search size={28} className="text-text" />
					</div>
					<div className="mb-2 flex items-center justify-between gap-4">
						<span className="rounded-full bg-surface-raised border-2 border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">

							Explore collections of libraries
						</span>
					</div>
				</div>
				<div className="rounded-b-4xl bg-surface p-5 text-text">

					<h3 className="text-text-muted md:text-2xl">
						Hello, welcome! Explore libraries or create your own
						library.
					</h3>
				</div>
				<div className="p-2">
					<div className="relative flex-1">
						<label htmlFor="library-search" className="sr-only">
							Search title, author or library
						</label>
						<input
							id="library-search"
							className="h-14 w-full rounded-2xl border border-border/80 bg-surface/95 px-4 pr-14 text-base text-text shadow-sm outline-none transition focus:success focus:ring-2 not-even:focus:danger"
							placeholder="Search title, author or library"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="button"
							aria-label="Search libraries"
							className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-linear-to-r from-accent to-danger text-text shadow-md transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-violet-200"
							onClick={handleSearch}
						>
							<Search size={18} className="text-white" />
						</button>
					</div>
				</div>


			</div>
		</section>
	);
}
