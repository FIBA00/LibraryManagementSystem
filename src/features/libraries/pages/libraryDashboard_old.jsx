import { Link, useOutletContext } from "react-router-dom";
import { AlertTriangle, ArrowRight, Building2 } from "lucide-react";

// internal imports
import { today } from "../../../lib/utils.js";
import Stat from "../../admin/components/stat.jsx";
import Health from "../../admin/components/health.jsx";

export default function LibraryDashboardPage() {
	const { user } = useOutletContext();

	return (
		<div className="mx-auto max-w-7xl space-y-7">
			<div>
				<div className="text-sm font-semibold text-text">{today}</div>
				<h1 className="mt-1 text-3xl font-extrabold tracking-tight text-text">
					Good Evening, {user?.username}
				</h1>
				<p className="mt-1 text-text-muted">
					Here's whats happening in your library
				</p>
			</div>

			<div className="grid gap-4 p-2 sm:grid-cols-2 xl:grid-cols-3 xl:grid-flow-col cyber-card">
				<Stat
					label="Registered Books"
					value="86"
					change="8.4%"
					Icon={Building2}
				/>
			</div>

			<section className="rounded-2xl border max-w-7xl border-border-strong bg-surface p-5 shadow-sm shadow-accent-alt hex-bg">
				<div className="flex items-center gap-3">
					<span className="sparkle size-4" />
					<div>
						<h2 className="font-bold">Network health</h2>
						<p className="mt-1 text-xs text-text-muted">
							Current library status
						</p>
					</div>
				</div>
				{/* TODO: wire to real getAllLibrary counts once useAdminLibraries hook exists */}
				<div className="mt-6 space-y-5">
					<Health label="Approved" value="72" total="86" />
					<Health label="Pending" value="8" total="86" />
					<Health label="Suspended" value="6" total="86" />
				</div>
				<div className="mt-7 rounded-xl bg-surface p-4">
					<div className="flex gap-3">
						<div>
							<AlertTriangle
								size={20}
								className="mt-0.5 text-danger"
							/>
						</div>

						<div>
							{/* <div className="text-sm font-bold">
                            {pending.length} registrations need review
                        </div> */}
							<div className="mt-1 text-xs leading-5 text-text-muted">
								Review applications before they can operate on
								the platform.
							</div>
							<Link
								to="/admin/libraries?status=pending"
								className="mt-3 flex text-xs gap-2 font-bold text-text hover:text-accent">
								Review queue <ArrowRight size={14} />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
