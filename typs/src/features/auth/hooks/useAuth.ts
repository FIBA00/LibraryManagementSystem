import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../../../api/auth.api.ts";
import type { LoginRequest, SignupRequest } from "../types/user.types.ts";

export function useLogin() {
	return useMutation({
		mutationFn: (payload: LoginRequest) => loginUser(payload),
		onSuccess: (data) => {
			localStorage.setItem("accessToken", data.accessToken);
		},
	});
}

export function useSignup() {
	return useMutation({
		mutationFn: (payload: SignupRequest) => signupUser(payload),
	});
}
