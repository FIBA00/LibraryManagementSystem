import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../../../api/auth.api.js";

export function useLogin() {
	return useMutation({
		mutationFn: (payload) => loginUser(payload),
	});
}
export function useSignup() {
	return useMutation({
		mutationFn: (payload) => signupUser(payload),
	});
}
