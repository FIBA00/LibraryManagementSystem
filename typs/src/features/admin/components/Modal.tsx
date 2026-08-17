import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({
	open,
	title,
	children,
	onClose,
}: {
	open: boolean;
	title: string;
	children: ReactNode;
	onClose: () => void;
}) {
	if (!open) return null;
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
			onMouseDown={onClose}>
			<div
				className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
				onMouseDown={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
					<h2 className="text-lg font-bold text-slate-900">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
						<X size={18} />
					</button>
				</div>
				<div className="max-h-[calc(90vh-72px)] overflow-y-auto p-6">
					{children}
				</div>
			</div>
		</div>
	);
}
