import {
	ArrowUpRight,
	BookOpen,
	Building2,
	Clock3,
	Users,
	AlertTriangle,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { libraries } from "../data/mock";
import { StatusBadge } from "../components/StatusBadge";
import { formatDate } from "../lib/utils";
import { Link } from "react-router-dom";

const activity = [
	{ day: "Mon", value: 42 },
	{ day: "Tue", value: 58 },
	{ day: "Wed", value: 49 },
	{ day: "Thu", value: 76 },
	{ day: "Fri", value: 63 },
	{ day: "Sat", value: 81 },
	{ day: "Sun", value: 69 },
];
const pending = libraries.filter((l) => l.status === "pending");
function Stat({
	label,
	value,
	change,
	Icon,
}: {
	label: string;
	value: string;
	change: string;
	Icon: typeof Users;
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
			<div className="flex items-start justify-between">
				<div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
					<Icon size={19} />
				</div>
				<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
					<ArrowUpRight size={13} />
					{change}
				</span>
			</div>
			<div className="mt-5 text-2xl font-extrabold tracking-tight">
				{value}
			</div>
			<div className="mt-1 text-sm text-slate-500">{label}</div>
		</div>
	);
}
export function Overview() {
	return (
		<div className="mx-auto max-w-7xl space-y-7">
			<div>
				<div className="text-sm font-semibold text-slate-400">
					Sunday, August 9
				</div>
				<h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
					Good evening, Admin.
				</h1>
				<p className="mt-1 text-slate-500">
					Here's what's happening across your library network.
				</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<Stat
					label="Registered libraries"
					value="86"
					change="8.4%"
					Icon={Building2}
				/>
				<Stat
					label="Total members"
					value="12,482"
					change="5.2%"
					Icon={Users}
				/>
				<Stat
					label="Books in catalog"
					value="48,920"
					change="12.1%"
					Icon={BookOpen}
				/>
				<Stat
					label="Pending reviews"
					value={String(pending.length + 5)}
					change="3 new"
					Icon={Clock3}
				/>
			</div>
			<div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
					<div className="flex items-start justify-between">
						<div>
							<h2 className="font-bold">Borrowing activity</h2>
							<p className="mt-1 text-xs text-slate-400">
								Books checked out over the last 7 days
							</p>
						</div>
						<button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">
							This week
						</button>
					</div>
					<div className="mt-5 h-64">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={activity}>
								<defs>
									<linearGradient
										id="fill"
										x1="0"
										y1="0"
										x2="0"
										y2="1">
										<stop
											offset="0%"
											stopColor="#0f172a"
											stopOpacity={0.16}
										/>
										<stop
											offset="100%"
											stopColor="#0f172a"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<XAxis
									dataKey="day"
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 11, fill: "#94a3b8" }}
								/>
								<Tooltip
									cursor={{ stroke: "#cbd5e1" }}
									contentStyle={{
										borderRadius: 12,
										border: "1px solid #e2e8f0",
										fontSize: 12,
									}}
								/>
								<Area
									type="monotone"
									dataKey="value"
									stroke="#0f172a"
									strokeWidth={2.5}
									fill="url(#fill)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</section>
				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="font-bold">Network health</h2>
							<p className="mt-1 text-xs text-slate-400">
								Current library status
							</p>
						</div>
						<span className="size-2 rounded-full bg-emerald-500" />
					</div>
					<div className="mt-6 space-y-5">
						<Health label="Approved" value="72" total="86" />
						<Health label="Pending" value="8" total="86" />
						<Health label="Suspended" value="6" total="86" />
					</div>
					<div className="mt-7 rounded-xl bg-slate-50 p-4">
						<div className="flex gap-3">
							<AlertTriangle
								size={17}
								className="mt-0.5 text-amber-500"
							/>
							<div>
								<div className="text-sm font-bold">
									8 registrations need review
								</div>
								<div className="mt-1 text-xs leading-5 text-slate-500">
									Review applications before they can operate
									on the platform.
								</div>
							</div>
						</div>
						<Link
							to="/admin/libraries?status=pending"
							className="mt-3 inline-flex text-xs font-bold text-slate-900">
							Review queue →
						</Link>
					</div>
				</section>
			</div>
			<section className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/30">
				<div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
					<div>
						<h2 className="font-bold">
							Recent library registrations
						</h2>
						<p className="mt-1 text-xs text-slate-400">
							Newest applications waiting for action
						</p>
					</div>
					<Link
						to="/admin/libraries"
						className="text-xs font-bold text-slate-700 hover:text-slate-950">
						View all
					</Link>
				</div>
				<div className="divide-y divide-slate-100">
					{pending.map((l) => (
						<div
							key={l.id}
							className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
							<div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
								<Building2 size={18} />
							</div>
							<div className="min-w-0 flex-1">
								<div className="truncate text-sm font-bold">
									{l.name}
								</div>
								<div className="mt-0.5 text-xs text-slate-400">
									{l.address} · Submitted{" "}
									{formatDate(l.createdAt)}
								</div>
							</div>
							<StatusBadge status={l.status} />
							<Link
								to={`/admin/libraries/${l.id}`}
								className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700">
								Review
							</Link>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
function Health({
	label,
	value,
	total,
}: {
	label: string;
	value: string;
	total: string;
}) {
	return (
		<div>
			<div className="mb-2 flex justify-between text-sm">
				<span className="font-semibold text-slate-700">{label}</span>
				<span className="text-slate-400">
					{value}/{total}
				</span>
			</div>
			<div className="h-2 overflow-hidden rounded-full bg-slate-100">
				<div
					className="h-full rounded-full bg-slate-900"
					style={{
						width: `${(Number(value) / Number(total)) * 100}%`,
					}}
				/>
			</div>
		</div>
	);
}
