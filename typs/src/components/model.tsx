import type { ReactNode } from "react";

import { X } from "lucide-react";

export function Modal({
	open,
	title,
	onClose,
	children,
}: {
	open: boolean;
	title: string;
	onClose: () => void;
	children: ReactNode;
}) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
			<div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white shadow-2xl">
				<div className="flex justify-between border-b border-slate-100 p-5">
					<h2 className="text-lg font-bold">{title}</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-2 hover:bg-slate-100">
						<X size={19} />
					</button>
				</div>
				<div className="p-5">{children}</div>
			</div>
		</div>
	);
}
