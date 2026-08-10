import { Link } from "react-router-dom";
import {
	BookOpen,
	Clock3,
	Heart,
	Search,
	Users,
	BarChart3,
	ArrowUpRight,
	Plus,
} from "lucide-react";
import { PortalShell } from "../components/layout";
import { BookCard } from "../components/bookCard";
import { books } from "../data/mock";
import { Button } from "../components/button";


export function Reader() {
	return (
		<PortalShell>
			<h1 className="text-3xl font-black">Good afternoon, Reader.</h1>
			<p className="mt-1 text-slate-500">Keep reading.</p>
			<div className="mt-8 grid gap-4 sm:grid-cols-3">
				{[
					[BookOpen, "Borrowed", "4"],
					[Clock3, "Due soon", "2"],
					[Heart, "Saved books", "12"],
				].map(([I, l, v]) => (
					<div
						className="rounded-2xl border bg-white p-5"
						key={l as string}>
						<div className="flex justify-between text-slate-500">
							<span>{l as string}</span>
							<I as any />
						</div>
						<b className="mt-4 block text-3xl">{v as string}</b>
					</div>
				))}
			</div>
			<div className="mt-10 flex items-center justify-between">
				<h2 className="text-xl font-black">Recommended for you</h2>
				<Link to="/books" className="font-bold">
					Browse
				</Link>
			</div>
			<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{books.map((b) => (
					<BookCard key={b.id} b={b} />
				))}
			</div>
		</PortalShell>
	);
}
export function Owner() {
	return (
		<PortalShell role="owner">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<p className="text-sm font-bold text-amber-600">
						YOUR LIBRARY
					</p>
					<h1 className="mt-1 text-3xl font-black">
						Addis Community Library
					</h1>
					<p className="text-slate-500">
						Keep your collection moving.
					</p>
				</div>
				<Button>
					<Plus size={17} /> Add book
				</Button>
			</div>
			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					[BookOpen, "Books", "4,820"],
					[Users, "Members", "1,240"],
					[ArrowUpRight, "Borrowed", "284"],
					[ArrowUpRight, "Overdue", "17"],
				].map(([I, l, v]) => (
					<div
						className="rounded-2xl border bg-white p-5"
						key={l as string}>
						<div className="flex justify-between text-slate-500">
							<span>{l as string}</span>
							<I as any />
						</div>
						<b className="mt-4 block text-2xl">{v as string}</b>
					</div>
				))}
			</div>
			<div className="mt-8 grid gap-6 lg:grid-cols-3">
				<div className="rounded-2xl border bg-white p-6 lg:col-span-2">
					<h2 className="font-black">Borrowing activity</h2>
					<div className="mt-8 flex h-52 items-end gap-3">
						{[35, 55, 42, 72, 62, 85, 70, 92, 64, 78, 88, 76].map(
							(h, i) => (
								<div
									key={i}
									className="flex-1 rounded-t-lg bg-amber-300"
									style={{ height: h + "%" }}
								/>
							),
						)}
					</div>
				</div>
				<div className="rounded-2xl border bg-white p-6">
					<h2 className="font-black">Quick actions</h2>
					{[
						"Manage catalog",
						"Manage members",
						"View borrowings",
					].map((x) => (
						<Link
							className="mt-3 block rounded-xl bg-slate-50 p-4 text-sm font-semibold"
							to="/owner"
							key={x}>
							{x}
						</Link>
					))}
				</div>
			</div>
		</PortalShell>
	);
}
export function Placeholder({
	title,
	role,
}: {
	title: string;
	role: "reader" | "owner";
}) {
	return (
		<PortalShell role={role}>
			<div className="grid min-h-[60vh] place-items-center text-center">
				<div>
					<div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-100">
						✦
					</div>
					<h1 className="mt-5 text-2xl font-black">{title}</h1>
					<p className="mt-2 text-slate-500">
						Ready for the real API integration.
					</p>
				</div>
			</div>
		</PortalShell>
	);
}
