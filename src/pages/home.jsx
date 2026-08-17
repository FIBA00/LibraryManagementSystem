<<<<<<< HEAD
import Hero from "../components/hero.jsx";

export default function Home() {
    return (
        <main>
            <Hero />
            <div>
                <h1>
                    Hello welcome explore libraries or create your own library
                </h1>
            </div>
        </main>

    )
=======
import { BookOpen, Building2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/hero.jsx";
import { books } from "../data/mock_data.js";
import BookCard from "../../typs/src/features/books/components/booksCard.jsx";
import Button from "../components/button.jsx";
import SearchSection from "../components/search.jsx";

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

	return (
		<main>
			<Hero />

			{/*explainers */}
			<section className="mx-auto grid grid-cols-1 max-w-dvw px-4 py-4 md:grid-cols-2 lg:px-8">
				<SearchSection />

				<section>
					<div className="grid gap-5 md:grid-cols-3">
						{explainers.map(([I, t, d]) => (
							<div className="rounded-2xl border p-6" key={t}>
								<div className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-600">
									<I />
								</div>
								<h3 className="mt-5 text-lg font-bold">{t}</h3>
								<p className="mt-2 text-sm leading-6 text-slate-500">
									{d}
								</p>
							</div>
						))}
					</div>
				</section>
			</section>

			{/* books people are reading */}

			<section className="bg-slate-900 text-white">
				<div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
					<h2 className="text-3xl font-block">
						Books people are reading
					</h2>
					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{books.map((b) => (
							<BookCard key={b.id} b={b} />
						))}
					</div>
				</div>
			</section>

			{/* for library */}
			<section className="bg-amber-400 text-black">
				<div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-14">
					<div>
						<h2 className="text-3xl font-black">Run a library ?</h2>
						<p className="mt-2">
							Bring your catelog online and make it easier for
							readers to find you{" "}
						</p>
					</div>
					<div>
						<Link to="/forlibraries">
							<Button>Explore library tools</Button>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
>>>>>>> a0a8e0c (- refactor: updated the entire frontend to use the jsx instead of the tsx)
}
