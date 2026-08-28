import { NavLink } from "react-router-dom";
import { BookOpen, ChevronDown, ShieldCheck, User, X } from "lucide-react";
import { useState } from "react";

// internal imports
import { classNameMerge } from "../lib/utils.js";

export default function Sidebar({ ...props }) {
	const [dropDownMenu, setDropDownMenu] = useState(false);

	return (
		<aside
			className={classNameMerge(
				"fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-surface border-r border-slate-600 transition-transform lg:translate-x-0",
				props.sideBarOpen ? "translate-x-0" : "-translate-x-full",
			)}>
			<div className="flex h-18 items-center justify-between border-b border-slate-600 px-6">
				<div className="flex items-center gap-3">
					<div className="grid size-9 place-items-center rounded-xl">
						<BookOpen size={19} />
					</div>
					<div>
						<div className="font-extrabold tracking-tight">
							{/* TODO: pass library owner from data here */}
							{props.user}
						</div>
						<div className="text-[10px] font-semibold uppercase tracking-tighter text-text-muted">
							Library Administration
						</div>
					</div>
				</div>

				<button
					className="lg:hidden"
					onClick={() => props.setSideBarOpen(false)}>
					<X size={20} />
				</button>
			</div>

			<nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
				{props.sections.map(function handleSections({ label, items }) {
					return (
						<div key={label}>
							<div className="px-3 pb-2 text-sm font-bold uppercase tracking-tight">
								{label}
							</div>
							<div>
								{items.map(function handleItems([
									to,
									name,
									Icon,
								]) {
									return (
										<NavLink
											key={to}
											to={to}
											end={to === "/admin"}
											onClick={() =>
												props.setSideBarOpen(false)
											}
											className={({ isActive }) =>
												classNameMerge(
													"mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
													isActive
														? "bg-surface-raised text-text shadow-sm shadow-accent-alt"
														: "text-text-muted hover:bg-accent hover:text-surface-hover",
												)
											}>
											<Icon size={18} />
											{name}
										</NavLink>
									);
								})}
							</div>
						</div>
					);
				})}
			</nav>

			<div className="relative m-4 rounded-2xl border-2 border-border-strong p-4">
				<div className="mb-3 flex items-center gap-2 text-xs font-bold text-text">
					<ShieldCheck size={15} /> Platform Admin
				</div>
				<div className="flex items-center gap-3">
					<div className="grid size-9 place-items-center rounded-full bg-success text-xs font-bold">
						{props.initials}
					</div>
					<div className="min-w-0">
						<div className="truncate text-sm font-semibold">
							{props.isLoading
								? "Loading..."
								: props.user?.username}
						</div>
						<div className="truncate text-xs text-text-muted capitalize">
							{props.isLoading ? "" : props.user?.role}
						</div>
					</div>
					<ChevronDown
						className="ml-auto cursor-pointer text-text-muted"
						size={15}
						onClick={() => setDropDownMenu((prev) => !prev)}
					/>
				</div>

				{dropDownMenu && props.user && (
					<div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-border-strong bg-surface p-4 shadow-lg">
						<div className="mb-2 flex items-center gap-2 text-xs font-bold text-text">
							<User size={14} /> Account
						</div>
						<dl className="space-y-1 text-xs text-text-muted">
							<div className="flex justify-between gap-2">
								<dt>Username</dt>
								<dd className="truncate text-text">
									{props.user.username}
								</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt>Email</dt>
								<dd className="truncate text-text">
									{props.user.email}
								</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt>Phone</dt>
								<dd className="truncate text-text">
									{props.user.phone}
								</dd>
							</div>
							<div className="flex justify-between gap-2">
								<dt>Role</dt>
								<dd className="truncate text-text capitalize">
									{props.user.role}
								</dd>
							</div>
						</dl>
					</div>
				)}
			</div>
		</aside>
	);
}
