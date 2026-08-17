import type { Book } from "../types";
import { Badge } from "./badge.tsx";

export function BookCard({ b }: { b: Book }) {
	return (
		<article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
			<img src={b.cover} alt="" className="h-56 w-full object-cover" />
			<div className="p-4">
				<div className="text-xs font-semibold text-amber-600">
					{b.category}
				</div>
				<h3 className="mt-2 font-bold">{b.title}</h3>
				<p className="mt-1 text-sm text-slate-500">{b.author}</p>
				<div className="mt-4 flex justify-between">
					<Badge tone="success">{b.available} available</Badge>
					<span className="text-xs text-slate-400">3 libraries</span>
				</div>
			</div>
		</article>
	);
}
