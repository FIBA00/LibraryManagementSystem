import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/utils.ts";

export function Button({
	children,
	variant = "primary",
	className,
	...p
}: {
	children: ReactNode;
	variant?: "primary" | "secondary" | "ghost" | "danger";
	className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
	const s = {
		primary: "bg-[#17202a] text-white hover:bg-[#263544]",
		secondary: "bg-[#f59e0b] text-[#17202a] hover:bg-[#fbbf24]",
		ghost: "hover:bg-slate-100",
		danger: "bg-red-600 text-white",
	}[variant];
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
				s,
				className,
			)}
			{...p}>
			{children}
		</button>
	);
}
