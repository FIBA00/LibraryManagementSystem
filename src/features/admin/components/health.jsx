export default function Health({ label, value, total }) {
	return (
		<div>
			<div className="mb-2 flex justify-between text-sm">
				<span className="font-semibold text-text">{label}</span>
				<span className="text-success">
					{value}/{total}
				</span>
			</div>
			<div className="h-2 overflow-hidden rounded-full bg-surface-raised">
				<div
					className="h-full rounded-full bg-suface"
					style={{
						width: `${(Number(value) / Number(total)) * 100}%`,
					}}
				/>
			</div>
		</div>
	);
}
