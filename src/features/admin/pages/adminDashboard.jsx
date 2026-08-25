import { useMemo, useState } from "react";

import { ArrowLeft, Building2, ChevronRight, Search, } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

// internal imports

import { libraries } from "../../../data/mock_data.js";
import { formatDate } from "../../../lib/utils.js";
import StatusBadge  from "../components/statusBadge.jsx";


const libraryStatuses = [ "all", "pending", "approved", "suspended", "rejected" ];

export default function AdminManageLibraries() {
	const [ libraryData ] = useState(libraries);
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ searchParams, setSearchParams ] = useSearchParams();
	const libraryStatus = searchParams.get("libraryStatus") ?? "all";
	const filteredLibraryByStatus = useMemo(
		() => libraryData.filter(filterByStatus),
		[ libraryData, libraryStatus, searchQuery ],
	);

	function filterByStatus(library) {
		return (
			(libraryStatus === "all" || library.status === libraryStatus) &&
			`${library.name} ${library.address}`
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);
	}
	return (
		<div className="mx-auto items-center justify-center max-w-7xl space-y-6">
			       <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-accent">
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<div className="text-sm font-semibold text-text-muted">Workspace</div>
					<h1 className="mt-1 text-3xl font-extrabold tracking-tight text-text">Libraries</h1>
					<p className="mt-1 text-text-muted">Review and manage every library registered on the platform.</p>
				</div>
				<button className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-ink">
					<Building2 size={16} /> Export
				</button>
			</div>

			<div className="rounded-2xl border border-border bg-surface-raised shadow-2xl shadow-surface-raised  overflow-x-auto">
				<div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
					<div className="relative flex-1 mx-auto">
						<Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
						<input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search libraries or locations..."
							className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm text-text outline-none transition focus:border-accent"
						/>
					</div>
					<div className="flex items-center gap-2 mx-auto">
						{libraryStatuses.map((s) => (
							<button
								key={s}
								onClick={() => setSearchParams(s === "all" ? {} : { libraryStatus: s })}
								className={`whitespace-nowrap mb-4 rounded-lg px-3 py-2 text-xs font-bold capitalize ${libraryStatus === s ? "bg-accent text-ink" : "text-text-muted hover:bg-surface-hover"
									}`}>
								{s}
							</button>
						))}
					</div>
				</div>

				<table className="w-full  text-left overflow-x-auto">
					<thead>
						<tr className="border-b border-border text-[11px] uppercase  text-text-muted">
							<th className="px-5 py-3 font-bold">Library</th>
							<th className="px-5 py-3 font-bold">Status</th>
							<th className="px-5 py-3 font-bold">Location</th>
							<th className="px-5 py-3 font-bold">Submitted</th>
							<th className="px-5 py-3" />
						</tr>
					</thead>
					<tbody className="divide-y divide-border overflow-x-auto">
						{filteredLibraryByStatus.map((library) => (
							<tr key={library.id} className="group hover:bg-accent/10 overflow-x-auto">
								<td className="px-5 py-4 overflow-x-auto">

									<Link to={`/admin/libraries/${library.id}`} className="flex items-center gap-3">
										<div className="grid size-10 place-items-center rounded-xl bg-surface text-text-muted">
											<Building2 size={17} />
										</div>
										<div>
											<div className="text-sm font-bold text-text">{library.name}</div>
											<div className="mt-0.5 text-xs text-text-muted">ID {library.id}</div>
										</div>
									</Link>

								</td>
								<td className="px-5 py-2"><StatusBadge status={library.status} /></td>
								<td className="px-5 py-2 text-sm text-text-muted">{library.address}</td>
								<td className="px-5 py-2 text-sm text-text-muted">{formatDate(library.createdAt)}</td>
								<td className="px-4 py-2">
									<div className="gap-1">
										<Link to={`/admin/libraries/${library.id}`} className="rounded-lg p-2 text-text-muted hover:bg-surface-hover hover:text-accent">
											<ChevronRight size={17} />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{filteredLibraryByStatus.length === 0 && (
					<div className="p-12 text-center text-sm text-text-muted">No libraries match your filters.</div>
				)}
			</div>
		</div>
	);

}
