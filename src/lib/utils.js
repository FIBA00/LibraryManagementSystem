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

export function getInitials(username) {
	if (!username) return "..";
	return username.slice(0, 2).toUpperCase();
}

export const today = new Date().toLocaleDateString(undefined, {
	weekday: "long",
	month: "long",
	day: "numeric",
});