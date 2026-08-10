import { useMemo, useState } from "react";
import {
	Check,
	Eye,
	Filter,
	MoreHorizontal,
	Search,
	ShieldAlert,
	X,
} from "lucide-react";
import {
	registrations as seed,
	type Library,
	type RegistrationStatus,
} from "../data/mock";
import { StatusBadge } from "../../../components/StatusBadge";
import { PageTitle } from "../../../components/PageTitle";
import { Modal } from "../components/Modal";

export function Registrations() {
	const [rows, setRows] = useState(seed);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<"All" | RegistrationStatus>("All");
	const [selected, setSelected] = useState<Library | null>(null);
	const [confirm, setConfirm] = useState<{
		row: Library;
		action: RegistrationStatus;
	} | null>(null);
	const filtered = useMemo(
		() =>
			rows.filter(
				(r) =>
					(filter === "All" || r.status === filter) &&
					`${r.name} ${r.owner} ${r.location}`
						.toLowerCase()
						.includes(query.toLowerCase()),
			),
		[rows, filter, query],
	);
	function update(row: Library, status: RegistrationStatus) {
		setRows((v) => v.map((x) => (x.id === row.id ? { ...x, status } : x)));
		setConfirm(null);
		setSelected(null);
	}
	return (
		<div>
			<PageTitle
				title="Library registrations"
				description="Review, approve, reject, and manage library onboarding requests."
			/>
			<div className="mb-4 flex flex-col gap-3 lg:flex-row">
				<div className="relative flex-1">
					<Search
						size={17}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
					/>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by library, owner, or location..."
						className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
					/>
				</div>
				<div className="flex gap-2 overflow-x-auto rounded-xl bg-white p-1 ring-1 ring-slate-200">
					{(
						[
							"All",
							"Pending",
							"Approved",
							"Rejected",
							"Suspended",
						] as const
					).map((s) => (
						<button
							key={s}
							onClick={() => setFilter(s)}
							className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${filter === s ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
							{s}
						</button>
					))}
				</div>
				<button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">
					<Filter size={16} />
					Filters
				</button>
			</div>
			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[900px] text-left text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500">
							<tr>
								<th className="px-5 py-3">Library</th>
								<th className="px-5 py-3">Owner</th>
								<th className="px-5 py-3">Location</th>
								<th className="px-5 py-3">Books</th>
								<th className="px-5 py-3">Members</th>
								<th className="px-5 py-3">Status</th>
								<th className="px-5 py-3 text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filtered.map((r) => (
								<tr key={r.id} className="hover:bg-slate-50">
									<td className="px-5 py-4">
										<div className="font-semibold">
											{r.name}
										</div>
										<div className="mt-0.5 text-xs text-slate-400">
											{r.email}
										</div>
									</td>
									<td className="px-5 py-4 text-slate-600">
										{r.owner}
									</td>
									<td className="px-5 py-4 text-slate-600">
										{r.location}
									</td>
									<td className="px-5 py-4 text-slate-600">
										{r.books.toLocaleString()}
									</td>
									<td className="px-5 py-4 text-slate-600">
										{r.members.toLocaleString()}
									</td>
									<td className="px-5 py-4">
										<StatusBadge status={r.status} />
									</td>
									<td className="px-5 py-4">
										<div className="flex justify-end gap-1">
											{r.status === "Pending" && (
												<>
													<button
														onClick={() =>
															setConfirm({
																row: r,
																action: "Approved",
															})
														}
														title="Approve"
														className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
														<Check size={17} />
													</button>
													<button
														onClick={() =>
															setConfirm({
																row: r,
																action: "Rejected",
															})
														}
														title="Reject"
														className="rounded-lg p-2 text-rose-600 hover:bg-rose-50">
														<X size={17} />
													</button>
												</>
											)}
											<button
												onClick={() => setSelected(r)}
												title="View"
												className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
												<Eye size={17} />
											</button>
											<button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
												<MoreHorizontal size={17} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
					<span>Showing {filtered.length} registrations</span>
					<span>Page 1 of 4</span>
				</div>
			</div>
			{selected && (
				<Modal
					title="Library registration"
					onClose={() => setSelected(null)}>
					<div className="space-y-4">
						<div>
							<h4 className="text-lg font-bold">
								{selected.name}
							</h4>
							<p className="text-sm text-slate-500">
								{selected.location} · submitted{" "}
								{selected.submitted}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							{[
								["Owner", selected.owner],
								["Email", selected.email],
								["Books", selected.books.toLocaleString()],
								["Members", selected.members.toLocaleString()],
							].map(([a, b]) => (
								<div
									key={a}
									className="rounded-xl bg-slate-50 p-3">
									<div className="text-xs text-slate-500">
										{a}
									</div>
									<div className="mt-1 text-sm font-semibold">
										{b}
									</div>
								</div>
							))}
						</div>
						{selected.status === "Pending" && (
							<div className="flex gap-2 pt-2">
								<button
									onClick={() =>
										setConfirm({
											row: selected,
											action: "Rejected",
										})
									}
									className="flex-1 rounded-xl border border-rose-200 py-2.5 text-sm font-semibold text-rose-600">
									Reject
								</button>
								<button
									onClick={() =>
										setConfirm({
											row: selected,
											action: "Approved",
										})
									}
									className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white">
									Approve library
								</button>
							</div>
						)}
						{selected.status === "Approved" && (
							<button
								onClick={() =>
									setConfirm({
										row: selected,
										action: "Suspended",
									})
								}
								className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-sm font-semibold text-white">
								<ShieldAlert size={16} />
								Suspend library
							</button>
						)}
					</div>
				</Modal>
			)}
			{confirm && (
				<Modal
					title={`${confirm.action} library?`}
					onClose={() => setConfirm(null)}>
					<p className="text-sm leading-6 text-slate-600">
						You are about to mark{" "}
						<strong>{confirm.row.name}</strong> as{" "}
						<strong>{confirm.action}</strong>. This is a demo
						action; connect it to your API handler when integrating.
					</p>
					<div className="mt-5 flex justify-end gap-2">
						<button
							onClick={() => setConfirm(null)}
							className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">
							Cancel
						</button>
						<button
							onClick={() => update(confirm.row, confirm.action)}
							className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
							Confirm
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}
