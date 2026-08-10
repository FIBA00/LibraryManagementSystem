import { Construction } from "lucide-react";
export function Placeholder({ title }: { title: string }) {
	return (
		<div className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center">
			<div className="text-center">
				<div className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-900 text-white">
					<Construction />
				</div>
				<h1 className="mt-5 text-2xl font-extrabold">{title}</h1>
				<p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
					This workspace is scaffolded and ready to connect to the
					corresponding backend resource.
				</p>
			</div>
		</div>
	);
}
