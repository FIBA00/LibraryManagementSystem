import { Bell, Menu, Search } from "lucide-react";
export function Header({ onMenu }: { onMenu: () => void }) {
	return (
		<header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
			<button
				onClick={onMenu}
				className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
				<Menu size={21} />
			</button>
			<div className="relative hidden max-w-md flex-1 md:block">
				<Search
					size={17}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
				/>
				<input
					placeholder="Search libraries, users, books..."
					className="w-full rounded-xl border-0 bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none ring-1 ring-transparent focus:bg-white focus:ring-indigo-200"
				/>
			</div>
			<div className="ml-auto flex items-center gap-3">
				<button className="relative rounded-xl p-2.5 hover:bg-slate-100">
					<Bell size={19} />
					<span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
				</button>
				<div className="flex items-center gap-3 border-l border-slate-200 pl-3">
					<div className="grid size-9 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
						FA
					</div>
					<div className="hidden sm:block">
						<div className="text-sm font-semibold">FRAOL</div>
						<div className="text-xs text-slate-500">
							Super Admin
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
