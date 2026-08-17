const VPU = import.meta.env.VITE_API_URL;
const API_URL = (VPU ?? "http://localhost:8001/api").replace(/\/$/, "");

export async function request(path, options = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers ?? {}),
		},
	});

	const data = await response.json().catch(() => ({}));
	if (!response.ok) throw new Error(data.message ?? "Request failed");
	return data;
}
