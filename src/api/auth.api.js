import { request } from "./client.js";

export async function loginUser(payload) {
    return request("/user/login", {
        method: "POST",
        body: JSON.stringify(payload)
    })
}

export async function signupUser(payload) {
    return request("/user/signup", {
        method: "POST",
        body: JSON.stringify(payload)
    })
}

export async function getCurrentUser() {
    return request("/user/me")
}