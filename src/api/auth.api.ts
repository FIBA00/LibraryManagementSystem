import { request } from "./client";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "../types/user.types";

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signupUser(payload: SignupRequest): Promise<SignupResponse> {
  return request<SignupResponse>("/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}