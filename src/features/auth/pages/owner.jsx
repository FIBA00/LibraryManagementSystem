import { ArrowRight, ArrowUpRight, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LibraryOwnerProfilePage() {
	const tabs = [
		[ BookOpen, "Books", "4,820" ],
		[ Users, "Members", "1,240" ],
		[ ArrowUpRight, "Borrowed", "284" ],
		[ ArrowUpRight, "Overdue", "17" ],
	];

	const quickActionTabs = [ "Manage catalog", "Manage members", "View borrowings" ];

	const profile = {
		name: "fraol bulti",
		age: 20,
		role: "admin",
		staffCount: 4,
	};

	return (
		<div className="flex flex-col gap-4">
			{/* profile */}
			<div className="cyber-card p-4">
				<div className="flex items-center justify-between border-b border-white/5 p-4">
					<p className="flex items-center gap-2 text-sm text-ink">
						<span className="sparkle inline-block"></span>
						Welcome {profile.name}
					</p>
				</div>

				<div className="mt-2 flex flex-col items-center gap-4 p-2 sm:grid sm:grid-cols-2">
					<div className="m-2 h-30 w-30 rounded-full border-2 border-red-300 p-2"></div>
					<div className="w-full">
						<div className="mb-4 flex items-center justify-between rounded-lg border-l-2 border-c-orange bg-c-red/5 p-2 text-sm">
							<div className="flex items-center gap-4 text-ink">
								<label>Age</label>
								<span className="px-4 text-xs text-c-purple">=</span>
								<p>{profile.age}</p>
							</div>
						</div>
						<div className="mb-4 flex items-center justify-between rounded-lg border-l-2 border-c-orange bg-c-purple/5 p-2 text-sm">
							<div className="flex items-center gap-4 text-ink">
								<label>Role</label>
								<span className="px-4 text-xs text-c-purple">=</span>
								<p>{profile.role}</p>
							</div>
						</div>
						<div className="mb-4 flex items-center justify-between rounded-lg border-l-2 border-c-orange bg-white/5 p-2 text-sm">
							<div className="flex items-center gap-4 text-ink">
								<label>StaffCount</label>
								<span className="px-4 text-xs text-c-purple">=</span>
								<p>{profile.staffCount}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* library */}
			<div className="cyber-card p-4">
				<div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
					<p className="flex items-center gap-2 text-sm text-ink">
						<span className="sparkle inline-block"></span>
						Your library
					</p>
				</div>

				<h1 className="mt-1 text-3xl font-black text-ink">Addis community library</h1>
				<p className="text-slate-600">Keep your collection moving</p>

				{/* TODO: replace with real dashboard stats once data layer is wired */}
				<div className="mt-6 flex gap-4">
					{tabs.map(function handleTab([ Icon, tab, amount ]) {
						return (
							<div key={tab} className="w-20 rounded-2xl border bg-white p-2">
								<div className="flex justify-between text-slate-500">
									<Icon size={18} />
								</div>
								<b className="mt-2 block text-2xl">{amount}</b>
							</div>
						);
					})}
				</div>

				<div className="mt-4">
					<h3 className="flex items-center justify-end gap-2 rounded-2xl border-2 border-amber-200 bg-c-card p-2 text-ink hover:text-c-orange">
						<span className="text-sm">+</span>
						<Link to="/dashboard">Dashboard</Link>
						<ArrowRight size={17} />
					</h3>
				</div>
			</div>

			{/* quick actions */}
			<div className="cyber-card p-4">
				<div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
					<p className="flex items-center gap-2 text-sm text-ink">
						<span className="sparkle inline-block"></span>
						Quick actions
					</p>
				</div>

				<div className="space-y-3">
					{quickActionTabs.map(function handleQuickActions(action) {
						return (
							<div key={action} className="rounded-lg border-l-2 border-cyber-orange bg-white/5 p-3">
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-4 text-ink">
										<span className="text-xs text-c-purple">▶</span>
										<Link to="/owner">{action}</Link>
									</div>
									<ArrowRight size={17} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}