import type { InputHTMLAttributes } from "react";

import { cn } from "../lib/utils.ts";

export function Input(p: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...p}
			className={cn(
				"w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100",
				p.className,
			)}
		/>
	);
}
