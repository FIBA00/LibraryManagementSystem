import { BookOpen, Clock3, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// internal imports

import { books } from "../../../data/mock_data.js";

import BookCard from "../../books/components/booksCard.jsx";

export default function ReaderProfilePage() {
	const tabs = [
		[BookOpen, "Borrowed", "4"],
		[Clock3, "Due Soon", "2"],
		[Heart, "Saved Books", "12"],
	];

	return (
		<div>
			<h1 className="text-3xl font-black">Good afternoon, Reader</h1>
			<p className="mt-1 text-c-orange">Keep Reading</p>

			{/* reader tabs */}
			<div className="flex mt-8 gap-4">
				{tabs.map(function tabHandler([I, tab, amount]) {
					return (
						<div
							key={tab}
							className="flex-1 w-10 items-center p-2 rounded-2xl border bg-amber-500 ">
							<span>
								<I size={19} />
							</span>
							<b className="mt-4 block text-2xl">{amount}</b>
						</div>
					);
				})}
			</div>

			<div className="mt-10 flex items-center justify-between">
				<h2 className="text-xl font-black">Recommended for you</h2>

				<Link to="/books" className="font-bold hover:text-c-orange">
					Browser books
				</Link>
			</div>

			<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{books.map(function handleBook(book) {
					return <BookCard key={book} book={book} />;
				})}
			</div>
		</div>
	);
}
