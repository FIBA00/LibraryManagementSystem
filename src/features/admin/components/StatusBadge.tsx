import { cn } from "../lib/utils.ts";
import type { RegistrationStatus } from "../features/admin/data/mock.ts";

export function StatusBadge({ status }: { status: RegistrationStatus }) {
	const styles: Record<RegistrationStatus, string> = {
		Pending: "bg-amber-50 text-amber-700 ring-amber-200",
		Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
		Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
		Suspended: "bg-slate-100 text-slate-700 ring-slate-200",
	};
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
				styles[status],
			)}>
			{status}
		</span>
	);
}
