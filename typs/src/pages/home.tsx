import { Link } from "react-router-dom";
import {
	ArrowRight,
	BookOpen,
	Building2,
	Search,
	Sparkles,
} from "lucide-react";

// Components

import { Button } from "../components/button.tsx";
import { BookCard } from "../components/bookCard.tsx";

import { books } from "../data/mock";

export function Home() {
	return (
		<>
			<main>
				<section className="bg-[#17202a] text-white">
					<div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-28">
						<div>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-300">
								<Sparkles size={14} /> A better way to find and
								run libraries
							</div>
							<h1 className="text-5xl font-black tracking-tight sm:text-6xl">
								Every book. Every library.{" "}
								<span className="text-amber-400">
									One place.
								</span>
							</h1>
							<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
								Discover books, check availability, and connect
								with libraries. Library owners get the tools to
								manage collections, members and circulation.
							</p>
							<div className="mt-8 flex gap-3">
								<Link to="/books">
									<Button variant="secondary">
										Find a book <ArrowRight size={17} />
									</Button>
								</Link>
								<Link to="/for-libraries">
									<Button className="bg-white/10 text-white">
										For libraries
									</Button>
								</Link>
							</div>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
							<div className="rounded-2xl bg-white p-4 text-[#17202a]">
								<div className="flex gap-3 border-b pb-4">
									<Search className="text-slate-400" />
									<span className="text-sm text-slate-400">
										Search title, author or library...
									</span>
								</div>
								{books.slice(0, 3).map((b) => (
									<div
										key={b.id}
										className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
										<img
											src={b.cover}
											className="size-12 rounded-lg object-cover"
										/>
										<div>
											<b className="block text-sm">
												{b.title}
											</b>
											<span className="text-xs text-green-600">
												{b.available} copies available
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				<section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
					<div className="grid gap-5 md:grid-cols-3">
						{[
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
						].map(([I, t, d]) => (
							<div
								className="rounded-2xl border p-6"
								key={t as string}>
								<div className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-600">
									<I />
								</div>
								<h3 className="mt-5 text-lg font-bold">
									{t as string}
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-500">
									{d as string}
								</p>
							</div>
						))}
					</div>
				</section>
				<section className="bg-white">
					<div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
						<h2 className="text-3xl font-black">
							Books people are reading
						</h2>
						<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
							{books.map((b) => (
								<BookCard key={b.id} b={b} />
							))}
						</div>
					</div>
				</section>
				<section className="bg-amber-400">
					<div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
						<div>
							<h2 className="text-3xl font-black">
								Run a library?
							</h2>
							<p className="mt-2">
								Bring your catalog online and make it easier for
								readers to find you.
							</p>
						</div>
						<Link to="/for-libraries">
							<Button>Explore library tools</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
