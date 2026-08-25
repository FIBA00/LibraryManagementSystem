import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// internal imports
import {
	getAllUserLibraries,
	createUserLibrary,
	updateUserLibrary,
	deleteUserLibrary,
	getUserLibrary,
} from "../api/library.api.js";

export function useOwnerLibraries(params = {}) {
	return useQuery({
		queryKey: ["ownerLibraries", params],
		queryFn: () => getAllUserLibraries(params),
	});
}
export function useOwnerLibrary(id) {
	return useQuery({
		queryKey: ["ownerLibrary", id],
		queryFn: () => getUserLibrary(id),
		enabled: Boolean(id),
	});
}

function useOwnerLibraryStatusMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: (_data, id) => {
			queryClient.invalidateQueries({ queryKey: ["ownerLibraries"] });
			queryClient.invalidateQueries({ queryKey: ["ownerLibrary", id] });
		},
	});
}

export function useOwnerCreateLibrary() {
	return useOwnerLibraryStatusMutation(createUserLibrary);
}

export function useOwnerUpdateLibrary() {
	return useOwnerLibraryStatusMutation(updateUserLibrary);
}

export function useOwnerDeleteLibrary() {
	return useOwnerLibraryStatusMutation(deleteUserLibrary);
}
