export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
}

export function formatDate(value) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}
