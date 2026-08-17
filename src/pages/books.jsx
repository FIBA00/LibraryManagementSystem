
// internal imports 
import SearchSection from "../components/search.jsx";
import BookCard from "../features/books/components/booksCard.jsx";

import { books } from "../data/mock_data.js";

export default function Books() {
	return (
		<>
			<main className="min-h-screen bg-c-bg">
				<div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
					<p className="text-sm font-bold uppercase tracking-widest">
						Discovery
					</p>
					<h1 className="mt-2 text-4xl font-black">
						Find your next book
					</h1>
					<p className="mt-3 text-4xl font-black">
						Search across participating libraries and see
						availability
					</p>

					<div className="mt-8 max-w-2xl">
						<SearchSection />
					</div>
					<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{books.map((book) => (
							<BookCard key={book.id} b={book} />
						))}
					</div>
				</div>
			</main>
		</>
	);
}
