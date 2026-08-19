export default function Button({ children, ...props }) {
	return (
		<button
			{...props}
			className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition  bg-accent w-30   text-text hover:bg-danger">
			{children}
		</button>
	);
}
