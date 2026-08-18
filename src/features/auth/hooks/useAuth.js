import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser, signupUser, getCurrentUser } from "../../../api/auth.api.js";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload) => loginUser(payload),
		onSuccess: function handleSuccess() {
			queryClient.invalidateQueries({
				queryKey: [ "currentUser" ]
			});
		}
	});
}
export function useSignup() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload) => signupUser(payload),
		onSuccess: function handleSuccess() {
			queryClient.invalidateQueries({
				queryKey: [ "currentUser" ]
			});
		}
	});
}

export function useCurrentUser() {
	return useQuery({
		queryKey: [ "currentUser" ],
		queryFn: getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
}