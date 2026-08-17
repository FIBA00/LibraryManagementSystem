import { request } from "./client";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "../types/user.types";

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signupUser(payload: SignupRequest): Promise<SignupResponse> {
  return request<SignupResponse>("/user/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}