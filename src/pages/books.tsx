import { Link } from "react-router-dom";
import {
	ArrowRight,
	BookOpen,
	Building2,
	Search,
	Sparkles,
} from "lucide-react";

// Components
import { Navbar, Footer } from "../components/layout";
import { Button, Input } from "../components/button";
import { BookCard, LibraryCard } from "../components/bookCard";

import { books, libraries } from "../data/mock";

export function Books() {
	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-slate-50">
				<div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
					<p className="text-sm font-bold uppercase tracking-widest text-amber-600">
						Discovery
					</p>
					<h1 className="mt-2 text-4xl font-black">
						Find your next book
					</h1>
					<p className="mt-3 text-slate-500">
						Search across participating libraries and see
						availability.
					</p>
					<div className="mt-8 max-w-2xl">
						<Input placeholder="Search title, author or category..." />
					</div>
					<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{books.map((b) => (
							<BookCard key={b.id} b={b} />
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
