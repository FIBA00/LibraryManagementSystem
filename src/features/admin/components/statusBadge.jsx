import { classNameMerge } from "../../../lib/utils.js";

export default function StatusBadge({ status }) {
	const styles = {
		pending: "bg-accent-alt text-text ring-amber-200",
		approved: "bg-success text-text ring-red-200",
		rejected: "bg-danger text-text ring-text-muted",
		suspended: "bg-accent text-text ring-slate-200",
	};
	return (
		<span
			className={classNameMerge(
				"inline-flex w-20 items-center text-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
				styles[status],
			)}>
			{status}
		</span>
	);
}
