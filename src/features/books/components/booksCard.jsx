import { Badge } from "lucide-react";

export default function BookCard({ book }) {
	return (
		<article className="cyber-card group overflow-hidden w-40 rounded-2xl border bg-surface  transition hover:-translate-y-1 hover:shadow-xl">
			<img
				src={book.cover}
				alt={book.title}
				className="h-30 w-full object-cover"
			/>
			<div className="p-4">
				<div className="text-xs font-sembibold text-text">
					{book.category}
				</div>
				<h3 className="mt-2 font-bold">{book.title}</h3>
				<p className="mt-1 text-sm text-text">{book.author}</p>
				<div className="mt-4 flex justify-between">
					<Badge tone="default">{book.available} available</Badge>
					{/* TODO: fetch how many libraries have this book */}
					<span className="text-xs text-success">
						3 libraries
					</span>
				</div>
			</div>
		</article>
	);
}
