export default function Row({ label, value }) {
	return (
		<div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
			<span className="text-text-muted">{label}</span>
			<span className="text-right font-semibold text-text">{value}</span>
		</div>
	);
}
