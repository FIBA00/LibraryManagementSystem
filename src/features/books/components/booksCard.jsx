import { Badge } from "lucide-react";

export default function BookCard({ book }) {
	return (
		<article className="group overflow-hidden rounded-2xl border bg-orange-900 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
			<img
				src={book.cover}
				alt={book.title}
				className="h-56 w-full object-cover"
			/>
			<div className="p-4">
				<div className="text-xs font-sembibold text-white">
					{book.category}
				</div>
				<h3 className="mt-2 font-bold">{book.title}</h3>
				<p className="mt-1 text-sm text-white">{book.author}</p>
				<div className="mt-4 flex justify-between">
					<Badge tone="default">{book.available} available</Badge>
					{/* TODO: fetch how many libraries have this book */}
					<span className="text-xs text-emerald-400">
						3 libraries
					</span>
				</div>
			</div>
		</article>
	);
}
