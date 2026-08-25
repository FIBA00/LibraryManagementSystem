import { ArrowUpRight } from "lucide-react";

export default function Stat({ label, value, change, Icon }) {
	return (
		<div className="rounded-2xl lg:w-3xs border border-border bg-surface p-5 shadow-sm shadow-accent-alt">
			<div className="flex items-start justify-between">
				<div className="grid size-10 place-items-center rounded-xl bg-surface text-text">
					<Icon size={19} />
				</div>
				<span className="inline-flex items-center gap-1 rounded-full bg-surface-raised px-2 py-1  font-bold text-success">
					<ArrowUpRight size={20} />
					{change}
				</span>
			</div>
			<div className="mt-5 text-2xl font-extrabold tracking-tight">
				{value}
			</div>
			<div className="mt-1 text-sm text-text-muted">{label}</div>
		</div>
	);
}
