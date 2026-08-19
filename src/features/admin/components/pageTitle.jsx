export default function PageTitle({
	title,
	description,
	action,
}) {
	return (
		<div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
					{title}
				</h1>
				<p className="mt-1.5 text-sm text-text-muted">{description}</p>
			</div>
			{action}
		</div>
	);
}
