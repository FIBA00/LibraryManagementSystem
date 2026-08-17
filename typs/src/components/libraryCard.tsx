import { MapPin, BookOpen } from "lucide-react";
import type { Library } from "../types";
import { Badge } from "./badge.tsx";

export function LibraryCard({ l }: { l: Library }) {
	return (
		<article className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg">
			<div className="flex justify-between">
				<span className="grid size-12 place-items-center rounded-xl bg-amber-50 text-amber-600">
					<BookOpen />
				</span>
				<Badge tone={l.status === "approved" ? "success" : "warning"}>
					{l.status}
				</Badge>
			</div>
			<h3 className="mt-5 font-bold">{l.name}</h3>
			<p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
				<MapPin size={14} />
				{l.location}
			</p>
			<p className="mt-3 text-sm leading-6 text-slate-500">
				{l.description}
			</p>
			<div className="mt-5 text-xs text-slate-500">
				<b className="text-slate-900">{l.books}</b> books ·{" "}
				<b className="text-slate-900">{l.members}</b> members
			</div>
		</article>
	);
}
