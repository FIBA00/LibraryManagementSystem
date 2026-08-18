// internal imports

import { ArrowRight, ArrowUpRight, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LibraryOwnerProfilePage() {
	const tabs = [
		[BookOpen, "Books", "4,820"],
		[Users, "Members", "1,240"],
		[ArrowUpRight, "Borrowed", "284"],
		[ArrowUpRight, "Overdue", "17"],
	];

	const quickActionTabs = [
		"Manage catalog",
		"Manage members",
		"View borrowings",
	];
	const profile = {
		name: "fraol bulti",
		age: 20,
		role: "admin",
		staffCount: 4,
	};
	return (
		<>
			<div className="justify-around gap-2  md:items-center">
				{/* profile */}
				<div className="cyber-card p-4 mb-4 ">
					<div className="flex justify-between items-center  border-b border-white/5 p-4">
						<h3 className="font-medium text-white flex items-center gap-2">
							<p className="text-sm text-ink flex items-center gap-2">
								<span className="sparkle inline-block"></span>
								Welcome {profile.name}
							</p>
						</h3>
					</div>

					<div className="flex flex-col sm:grid sm:grid-cols-2 justify-center items-center-safe gap-4 mt-2 p-2 ">
						<div className="rounded-full h-30 w-30 m-2 p-2 border-2 border-red-300 "></div>
						<div>
							<div>
								<div className="flex items-center justify-between text-sm mb-4 p-2 rounded-lg bg-c-red/5 border-l-2 border-c-orange ">
									<div className="flex items-center gap-4 text-ink">
										<label>Age</label>
										<span className="px-4 text-c-purple text-xs hover:text-c-orange">
											=
										</span>
										<p>{profile.age}</p>
									</div>
								</div>
								<div className="flex items-center justify-between text-sm mb-4 p-2 rounded-lg bg-c-purple/5 border-l-2 border-c-orange">
									<div className="flex items-center gap-4 text-ink">
										<label>Role</label>
										<span className="px-4 text-c-purple text-xs hover:text-c-orange">
											=
										</span>
										<p>{profile.role}</p>
									</div>
								</div>
								<div className="flex items-center justify-between text-sm mb-4 p-2 rounded-lg bg-white/5 border-l-2 border-c-orange">
									<div className="flex items-center gap-4 text-ink">
										<label>StaffCount</label>
										<span className="px-4 text-c-purple text-xs hover:text-c-orange">
											=
										</span>
										<p>{profile.staffCount}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* library */}

				<div className="cyber-card md:col-span-3 p-4 mb-4">
					<div className="flex  justify-between items-center mb-6 border-b border-white/5 pb-4">
						<p className="text-sm text-ink flex items-center gap-2">
							<span className="sparkle inline-block"></span>Your
							library
						</p>
					</div>

					<p className="text-sm font-bold text-amber-600"></p>

					<h1 className="mt-1 text-3xl font-black text-ink">
						Addis community library
					</h1>

					<p className="text-slate-600">
						Keep your collection moving
					</p>
					{/* TODO: design owner based dashboard design this page is for profile only. */}
					<div className="flex gap-4 mt-6 ">
						{tabs.map(function handleTab([I, tab, amount]) {
							return (
								<div
									className="w-20 p-2 rounded-2xl border bg-white"
									key={tab}>
									<div className="flex justify-between text-slate-500">
										<span>
											<I />
										</span>
									</div>
									<b className="mt-2 block text-2xl">
										{amount}
									</b>
								</div>
							);
						})}
					</div>

					<div className="mt-4">
						<h3 className="flex justify-end p-2 items-center gap-2 bg-c-card border-2 border-amber-200 rounded-2xl text-ink hover:text-c-orange">
							<span className="icon-cross text-sm">+</span>

							<Link to="/dashboard">Dashboard</Link>
							<ArrowRight size={17} />
						</h3>
					</div>
				</div>

				{/* <div className="mt-8 grid gap-6 lg:grid-cols-3">
					<div className="rounded-2xl border bg-white p-6 lg:col-span-2">
						<h2 className="font-black">Borrowing activity</h2>
						<div className="mt-8 flex h-52 items-end gap-3">
							{[
								35, 55, 42, 72, 62, 85, 70, 92, 64, 78, 88, 76,
							].map((h, i) => (
								<div
									key={i}
									className="flex-1 rounded-t-lg bg-amber-300"
									style={{ height: h + "%" }}
								/>
							))}
						</div>
					</div>
				</div> */}

				<div className="cyber-card md:col-span-3 p-4">
					<div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
						<h3 className="font-medium text-white flex items-center gap-2">
							<p className="text-sm text-ink flex items-center gap-2">
								<span className="sparkle inline-block"></span>{" "}
								Quick actions
							</p>
						</h3>
					</div>

					{quickActionTabs.map(function handleQuickActions(action) {
						return (
							<div className="space-y-3 mb-4">
								<div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5 border-l-2 border-cyber-orange">
									<div className="flex items-center gap-4 text-ink">
										<span className="px-4 text-c-purple text-xs hover:text-c-orange">
											▶
											<Link to="/owner" key={action}>
												{action}
											</Link>
										</span>
										<ArrowRight size={17} />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
