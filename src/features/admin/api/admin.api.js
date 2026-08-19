import { request } from "./client.js";

export async function getAllLibraries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/libraries${query ? `?${query}` : ""}`);
}

export async function getLibrary(id) {
    return request(`/admin/libraries/${id}`);
}

export async function approveLibrary(id) {
    return request(`/admin/libraries/approve/${id}`, { method: "POST" });
}

export async function suspendLibrary(id) {
    return request(`/admin/libraries/suspend/${id}`, { method: "POST" });
}

export async function rejectLibrary(id) {
    return request(`/admin/libraries/reject/${id}`, { method: "POST" });
}

export async function deleteLibrary(id) {
    return request(`/admin/libraries/${id}`, { method: "DELETE" });
}