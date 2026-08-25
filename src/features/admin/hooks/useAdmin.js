import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// internal imports
import {
	getAllAdminLibraries,
	getAdminLibrary,
	approveLibrary,
	suspendLibrary,
	rejectLibrary,
	deleteLibrary,
} from "../api/admin.api.js";

export function useAdminLibraries(params = {}) {
	return useQuery({
		queryKey: [ "adminLibraries", params ],
		queryFn: () => getAllAdminLibraries(params),
	});
}

export function useAdminLibrary(id) {
	return useQuery({
		queryKey: [ "adminLibrary", id ],
		queryFn: () => getAdminLibrary(id),
		enabled: Boolean(id),
	});
}

// approve/suspend/reject/delete all follow the same shape: call the endpoint
// with an id, then invalidate the list + that single library's cache entry.
function useAdminLibraryStatusMutation(mutationFn) {
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
	return useAdminLibraryStatusMutation(approveLibrary);
}

export function useSuspendLibrary() {
	return useAdminLibraryStatusMutation(suspendLibrary);
}

export function useRejectLibrary() {
	return useAdminLibraryStatusMutation(rejectLibrary);
}

export function useDeleteLibrary() {
	return useAdminLibraryStatusMutation(deleteLibrary);
}