const VPU = import.meta.env.VITE_API_URL 
const API_URL = (VPU ?? "https://locahost:8001/api").replace(/\/$/, "");

export async function request(path, options) {
    console.log("Senfing Request to server: ", path)
    const token = localStorage.getItem("accessToken")


    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers ?? {})
        }
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message ?? "Request failed")
    return data
}