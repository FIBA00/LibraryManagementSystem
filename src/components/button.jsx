export default function Button({ children, ...props }) {
	return (
		<button
			{...props}
			className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition  bg-amber-500 w-36  text-white hover:bg-amber-600">
			{children}
		</button>
	);
}
