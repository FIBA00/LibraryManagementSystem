import {
	ArrowUpRight,
	BookOpen,
	Building2,
	Clock3,
	MoreHorizontal,
	Users,
} from "lucide-react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { monthly, recentActivity, registrations } from "../data/mock";
import { Link } from "react-router";
import { StatusBadge } from "../../../components/StatusBadge";
import { PageTitle } from "../../../components/PageTitle";

const stats = [
	[
		"Total libraries",
		"148",
		"+12.5%",
		"bg-indigo-50 text-indigo-600",
		Building2,
	],
	[
		"Active members",
		"18,429",
		"+8.2%",
		"bg-emerald-50 text-emerald-600",
		Users,
	],
	[
		"Books cataloged",
		"284,620",
		"+14.8%",
		"bg-violet-50 text-violet-600",
		BookOpen,
	],
	[
		"Pending approvals",
		"12",
		"Needs review",
		"bg-amber-50 text-amber-600",
		Clock3,
	],
] as const;
export function Overview() {
	return (
		<div>
			<PageTitle
				title="Good evening, FRAOL"
				description="Here’s what’s happening across the library network today."
				action={
					<button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
						Export report
					</button>
				}
			/>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{stats.map(([label, value, trend, color, Icon]) => (
					<div
						key={label}
						className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<div className="flex items-center justify-between">
							<div
								className={`grid size-10 place-items-center rounded-xl ${color}`}>
								<Icon size={19} />
							</div>
							<span className="text-xs font-semibold text-emerald-600">
								{trend}
							</span>
						</div>
						<div className="mt-5 text-2xl font-bold">{value}</div>
						<div className="mt-1 text-sm text-slate-500">
							{label}
						</div>
					</div>
				))}
			</div>
			<div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-start justify-between">
						<div>
							<h2 className="font-semibold">Network growth</h2>
							<p className="mt-1 text-xs text-slate-500">
								Libraries and members over the last 6 months
							</p>
						</div>
						<button className="rounded-lg p-2 hover:bg-slate-100">
							<MoreHorizontal size={18} />
						</button>
					</div>
					<div className="mt-5 h-72">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={monthly}>
								<defs>
									<linearGradient
										id="g"
										x1="0"
										y1="0"
										x2="0"
										y2="1">
										<stop
											offset="0%"
											stopColor="#6366f1"
											stopOpacity={0.22}
										/>
										<stop
											offset="100%"
											stopColor="#6366f1"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									vertical={false}
									stroke="#e2e8f0"
								/>
								<XAxis
									dataKey="month"
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12, fill: "#64748b" }}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12, fill: "#64748b" }}
								/>
								<Tooltip />
								<Area
									type="monotone"
									dataKey="users"
									stroke="#6366f1"
									fill="url(#g)"
									strokeWidth={2.5}
									name="Members"
								/>
								<Area
									type="monotone"
									dataKey="libraries"
									stroke="#94a3b8"
									fill="none"
									strokeWidth={2}
									name="Libraries"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="font-semibold">Recent activity</h2>
							<p className="mt-1 text-xs text-slate-500">
								Latest network events
							</p>
						</div>
						<button className="text-xs font-semibold text-indigo-600">
							View all
						</button>
					</div>
					<div className="mt-5 space-y-5">
						{recentActivity.map(([name, event, time], i) => (
							<div className="flex gap-3" key={i}>
								<div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
									{name[0]}
								</div>
								<div className="min-w-0 flex-1">
									<div className="truncate text-sm font-medium">
										{event}
									</div>
									<div className="truncate text-xs text-slate-500">
										{name}
									</div>
								</div>
								<span className="whitespace-nowrap text-[11px] text-slate-400">
									{time}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
					<div>
						<h2 className="font-semibold">Registration queue</h2>
						<p className="mt-1 text-xs text-slate-500">
							Libraries requiring administrator attention
						</p>
					</div>
					<Link
						to="/registrations"
						className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
						Open queue <ArrowUpRight size={15} />
					</Link>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500">
							<tr>
								<th className="px-5 py-3">Library</th>
								<th className="px-5 py-3">Location</th>
								<th className="px-5 py-3">Owner</th>
								<th className="px-5 py-3">Status</th>
								<th className="px-5 py-3">Submitted</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{registrations.slice(0, 4).map((r) => (
								<tr key={r.id} className="hover:bg-slate-50">
									<td className="px-5 py-4 font-semibold">
										{r.name}
									</td>
									<td className="px-5 py-4 text-slate-500">
										{r.location}
									</td>
									<td className="px-5 py-4 text-slate-500">
										{r.owner}
									</td>
									<td className="px-5 py-4">
										<StatusBadge status={r.status} />
									</td>
									<td className="px-5 py-4 text-slate-500">
										{r.submitted}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
