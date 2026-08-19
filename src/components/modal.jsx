import { X } from "lucide-react";

export default function Modal({
    open,
    title,
    children,
    onClose,
}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/45 backdrop-blur-sm" onMouseDown={onClose}>
            <div className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-surface shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <h2 className="text-lg font-bold text-text">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-text-muted hover:bg-danger hover:text-text"
                    >
                        <X size={18} />

                    </button>
                </div>
                <div className="max-h-[calc(90vh-72px)] overflow-y-auto p-2">
                    {children}
                </div>

            </div>
        </div>
    );
}