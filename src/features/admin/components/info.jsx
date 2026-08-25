export default function Info({ title, children }) {
	return (
		<div>
			<div className="flex gap-2 mb-3 items-center">
				<div className="sparkle size-4" />
				<h2 className="text-sm font-bold">{title}</h2>
			</div>
			<div className="divide-y divide-surface rounded-xl border border-border">
				{children}
			</div>
		</div>
	);
}
