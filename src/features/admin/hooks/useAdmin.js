import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// internal imports
import {
	getAllLibraries,
	getLibrary,
	approveLibrary,
	suspendLibrary,
	rejectLibrary,
	deleteLibrary,
} from "../api/admin.api.js";

export function useAdminLibraries(params = {}) {
	return useQuery({
		queryKey: [ "adminLibraries", params ],
		queryFn: () => getAllLibraries(params),
	});
}

export function useAdminLibrary(id) {
	return useQuery({
		queryKey: [ "adminLibrary", id ],
		queryFn: () => getLibrary(id),
		enabled: Boolean(id),
	});
}

// approve/suspend/reject/delete all follow the same shape: call the endpoint
// with an id, then invalidate the list + that single library's cache entry.
function useLibraryStatusMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: (_data, id) => {
			queryClient.invalidateQueries({ queryKey: [ "adminLibraries" ] });
			queryClient.invalidateQueries({ queryKey: [ "adminLibrary", id ] });
		},
	});
}

export function useApproveLibrary() {
	return useLibraryStatusMutation(approveLibrary);
}

export function useSuspendLibrary() {
	return useLibraryStatusMutation(suspendLibrary);
}

export function useRejectLibrary() {
	return useLibraryStatusMutation(rejectLibrary);
}

export function useDeleteLibrary() {
	return useLibraryStatusMutation(deleteLibrary);
}