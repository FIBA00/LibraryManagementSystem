import type { Library, LibraryStatus } from "../types";

const API_URL = (
	import.meta.env.VITE_API_URL ?? "http://localhost:8001/api"
).replace(/\/$/, "");

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
	console.log("Requesting",path)
	const token = localStorage.getItem("accessToken");
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options?.headers ?? {}),
		},
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) throw new Error(data.message ?? "Request failed");
	return data;
}

export async function getLibraries(): Promise<Library[]> {
	const data = await request<{ libraries: Library[] }>("/admin/library");
	return data.libraries;
}

export async function getLibrary(id: string): Promise<Library> {
	const data = await request<{ library: Library }>(`/admin/library/${id}`);
	return data.library;
}

export async function reviewLibrary(
	id: string,
	status: Exclude<LibraryStatus, "pending">,
): Promise<Library> {
	const action =
		status === "approved"
			? "approve"
			: status === "suspended"
				? "suspend"
				: "reject";
	const data = await request<{ library: Library }>(
		`/admin/library/${action}/${id}`,
		{ method: "POST" },
	);
	return data.library;
}
