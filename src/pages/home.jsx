import { BookOpen, Building2, Search } from "lucide-react";
import { Link } from "react-router-dom";

// internal imports
import { books } from "../data/mock_data.js";
import Hero from "../components/hero.jsx";
import Button from "../components/button.jsx";
import SearchSection from "../components/search.jsx";
import BookCard from "../../src/features/books/components/booksCard.jsx";

export default function Home() {
	const explainers = [
		[
			Search,
			"Find what you need",
			"Search books and see which libraries have them available.",
		],
		[
			Building2,
			"Connect to libraries",
			"Discover public and private libraries and their collections.",
		],
		[
			BookOpen,
			"Run your library",
			"Manage catalog, members, circulation and staff.",
		],
	];

	// TODO: replace with real counts from getPublicLibraries once wired
	const stats = [
		["1,200+", "books cataloged"],
		["40+", "libraries"],
		["500+", "active readers"],
	];

	// TODO: scroll up on coming to home page
	return (
		<main>
			<Hero />

			{/* stats bar */}
			<section className="border-y border-border bg-surface">
				<div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-5 py-8 text-center">
					{stats.map(([value, label]) => (
						<div key={label}>
							<p className="text-3xl font-black text-accent">{value}</p>
							<p className="mt-1 text-sm text-text-muted">{label}</p>
						</div>
					))}
				</div>
			</section>

			{/* search */}
			<section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
				<SearchSection />
			</section>

			{/* explainers */}
			<section className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
				<div className="grid gap-5 md:grid-cols-3">
					{explainers.map(([Icon, title, desc]) => (
						<div className="flex gap-4 rounded-2xl border border-border p-6" key={title}>
							<div className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-accent">
								<Icon />
							</div>

							<div>
								<h3 className="text-lg font-bold">{title}</h3>
								<p className="mt-2 text-sm leading-6 text-text-muted">
									{desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* books people are reading */}
			<section>
				<div className="mx-auto flex max-w-7xl flex-col px-5 py-20 lg:px-8">
					<h2 className="bg-surface h-20 p-3 m-2 text-center text-3xl font-black">
						Books people are reading
					</h2>
					<div className="mt-4 mb-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
						{books.map((book) => (
							<BookCard key={book.id} book={book} />
						))}
					</div>
				</div>
			</section>

			{/* dual audience CTA */}
			<section className="bg-surface-hover text-text">
				<div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-2">
					<div className="flex flex-col gap-4">
						<div>
							<h2 className="text-3xl font-black">Looking for a book?</h2>
							<p className="mt-2 text-text-muted">
								Search across every connected library and see what's
								available near you.
							</p>
						</div>
						<div>
							<Link to="/browse">
								<Button>Browse books</Button>
							</Link>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div>
							<h2 className="text-3xl font-black">Run a library?</h2>
							<p className="mt-2 text-text-muted">
								Bring your catalog online and make it easier for
								readers to find you.
							</p>
						</div>
						<div>
							<Link to="/forlibraries">
								<Button>Explore library tools</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}