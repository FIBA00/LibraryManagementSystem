import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
export function Layout() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-screen bg-slate-50">
			<Sidebar open={open} onClose={() => setOpen(false)} />
			<div className="min-w-0 flex-1">
				<Header onMenu={() => setOpen(true)} />
				<main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
