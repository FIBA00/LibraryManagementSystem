import type { ReactNode } from "react";

export function Badge({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: "success" | "warning" | "danger" | "neutral";
}) {
	const s = {
		success: "bg-green-50 text-green-700",
		warning: "bg-amber-50 text-amber-700",
		danger: "bg-red-50 text-red-700",
		neutral: "bg-slate-100 text-slate-700",
	}[tone];
	return (
		<span
			className={
				"inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " +
				s
			}>
			{children}
		</span>
	);
}
