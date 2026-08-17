import { useState } from "react";
import { Search } from "lucide-react";
export default function SearchSection() {
	// real working search input
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<section className="w-full px-2 py-4 md:px-4">
			<div className="mt-4 overflow-hidden rounded-4xl border border-white/10 bg-[#0f172a]/80 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-sm">
				<div className="flex flex-col gap-4 border-b border-white/10 bg-linear-to-r from-fuchsia-500/10 via-violet-500/10 to-sky-500/10 p-4 md:flex-row md:items-center md:p-6">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-slate-300 shadow-inner shadow-white/10">
						<Search size={28} className="text-slate-200" />
					</div>

					<div className="relative flex-1">
						<label htmlFor="library-search" className="sr-only">
							Search title, author or library
						</label>
						<input
							id="library-search"
							className="h-14 w-full rounded-2xl border border-amber-300/80 bg-white/95 px-4 pr-14 text-base text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-200/70"
							placeholder="Search title, author or library"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="button"
							aria-label="Search libraries"
							className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-sky-500 text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-violet-200">
							<Search size={18} className="text-white" />
						</button>
					</div>
				</div>

				<div className="rounded-b-4xl bg-white p-5 text-[#17202a] md:p-6">
					<div className="mb-3 flex items-center justify-between gap-4">
						<span className="rounded-full bg-[#f3e8ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
							Library
						</span>
						<span className="text-sm text-slate-500">
							Explore collections
						</span>
					</div>

					<h3 className="text-xl font-semibold text-slate-800 md:text-2xl">
						Hello, welcome! Explore libraries or create your own
						library.
					</h3>
				</div>
			</div>
		</section>
	);
}
