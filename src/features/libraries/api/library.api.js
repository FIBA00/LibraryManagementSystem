import { request } from "../../../api/client.js";

export async function getAllUserLibraries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(
        `/library${query ? `?${query}` : ""}`
    );
}
export async function getUserLibrary(id) {
    return request(
        `/library/${id}`
    )
}

export async function createUserLibrary(payload) {
    return request(
        "/library", {
        method: "POST",
        body: JSON.stringify(payload)
    }
    );
}

export async function updateUserLibrary(id, payload) {
    return request(
        `/library/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    }
    );
}

export async function deleteUserLibrary(id) {
    return request(
        `/library/${id}`, {
        method: "DELETE",
    }
    );
}